// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IERC20 {
    function approve(address spender, uint256 amount) external returns (bool);
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address owner) external view returns (uint256);
}

interface IWETH {
    function deposit() external payable;
    function withdraw(uint256 amount) external;
    function transfer(address to, uint256 amount) external returns (bool);
}

interface IUniswapV2Router02 {
    function swapExactTokensForTokens(
        uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline
    ) external returns (uint[] memory amounts);

    function swapExactTokensForETH(
        uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline
    ) external returns (uint[] memory amounts);

    function swapExactETHForTokens(
        uint amountOutMin, address[] calldata path, address to, uint deadline
    ) external payable returns (uint[] memory amounts);

    function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts);
}

contract SwapAndSend {
    address public owner;
    address public projectWallet;
    IUniswapV2Router02 public router;
    IWETH public weth;
    uint256 public projectFeePercent = 50; // 0.5% (50 basis points)
    uint256 public constant FEE_DENOMINATOR = 10000;

    modifier onlyOwner() { require(msg.sender == owner, "owner"); _; }

    constructor(address _router, address _weth, address _projectWallet) {
        owner = msg.sender;
        router = IUniswapV2Router02(_router);
        weth = IWETH(_weth);
        projectWallet = _projectWallet;
    }

    // Swap USDC -> token and send to recipient with project fee
    function swapUSDCForTokenAndSend(
        address usdc,
        uint256 amountIn,
        address[] calldata path,
        address recipient,
        uint256 minOut,
        uint256 deadline
    ) external onlyOwner returns (uint256) {
        // Calculate project fee
        uint256 projectFee = (amountIn * projectFeePercent) / FEE_DENOMINATOR;
        uint256 amountForSwap = amountIn - projectFee;
        
        // Send project fee to project wallet
        if (projectFee > 0) {
            IERC20(usdc).transfer(projectWallet, projectFee);
        }
        
        // Approve and swap remaining amount
        IERC20(usdc).approve(address(router), amountForSwap);
        router.swapExactTokensForTokens(amountForSwap, minOut, path, recipient, deadline);
        return 1;
    }

    // Swap USDC -> ETH and send to recipient with project fee
    function swapUSDCForETHAndSend(
        address usdc,
        uint256 amountIn,
        address[] calldata path,
        address recipient,
        uint256 minOut,
        uint256 deadline
    ) external onlyOwner returns (uint256) {
        // Calculate project fee
        uint256 projectFee = (amountIn * projectFeePercent) / FEE_DENOMINATOR;
        uint256 amountForSwap = amountIn - projectFee;
        
        // Send project fee to project wallet
        if (projectFee > 0) {
            IERC20(usdc).transfer(projectWallet, projectFee);
        }
        
        // Approve and swap remaining amount for ETH
        IERC20(usdc).approve(address(router), amountForSwap);
        router.swapExactTokensForETH(amountForSwap, minOut, path, recipient, deadline);
        return 1;
    }

    // Direct ETH swap and send (for when we have ETH directly)
    function swapETHForTokenAndSend(
        address[] calldata path,
        address recipient,
        uint256 minOut,
        uint256 deadline
    ) external payable onlyOwner returns (uint256) {
        // Calculate project fee
        uint256 projectFee = (msg.value * projectFeePercent) / FEE_DENOMINATOR;
        uint256 amountForSwap = msg.value - projectFee;
        
        // Send project fee to project wallet
        if (projectFee > 0) {
            payable(projectWallet).transfer(projectFee);
        }
        
        // Swap remaining ETH for tokens
        router.swapExactETHForTokens{value: amountForSwap}(minOut, path, recipient, deadline);
        return 1;
    }

    // Update project fee percentage (only owner)
    function setProjectFeePercent(uint256 _feePercent) external onlyOwner {
        require(_feePercent <= 1000, "Fee too high"); // Max 10%
        projectFeePercent = _feePercent;
    }

    // Update project wallet (only owner)
    function setProjectWallet(address _projectWallet) external onlyOwner {
        require(_projectWallet != address(0), "Invalid address");
        projectWallet = _projectWallet;
    }

    // Rescue ERC20 tokens
    function rescueERC20(address token, address to) external onlyOwner {
        uint256 b = IERC20(token).balanceOf(address(this));
        if (b > 0) IERC20(token).transfer(to, b);
    }

    // Rescue ETH
    function rescueETH(address to) external onlyOwner {
        uint256 balance = address(this).balance;
        if (balance > 0) {
            payable(to).transfer(balance);
        }
    }

    // Receive ETH
    receive() external payable {}
}
