"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/socialNetworkDB"; // ✅ Use correct DB
mongoose_1.default.connect(dbUri, {});
mongoose_1.default.connection.once("open", () => {
    console.log(`✅ MongoDB connected: ${mongoose_1.default.connection.name}`); // Debugging log
});
exports.default = mongoose_1.default.connection;
//# sourceMappingURL=connection.js.map