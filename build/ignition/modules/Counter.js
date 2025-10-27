"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modules_1 = require("@nomicfoundation/hardhat-ignition/modules");
exports.default = (0, modules_1.buildModule)("CounterModule", (m) => {
    const counter = m.contract("Counter");
    m.call(counter, "incBy", [5n]);
    return { counter };
});
//# sourceMappingURL=Counter.js.map