"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diaries_1 = __importDefault(require("./routes/diaries"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use((0, cors_1.default)());
app.get('/ping', (_req, res) => {
    console.log('somebody pinged');
    res.send('pong');
});
app.use('/api/diaries', diaries_1.default);
const PORT = 3009;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
