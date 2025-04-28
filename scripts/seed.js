"use strict";
// pnpm i dotenv
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// scripts/seed.ts
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var postgres_1 = __importDefault(require("postgres"));
var dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
// Initialize postgres client
var sql = (0, postgres_1.default)(process.env.POSTGRES_URL, { ssl: "require" });
function seedDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        var locationsPath, locationsData, batchSize, processed, i, batch, values, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, 9, 11]);
                    console.log("Starting database seeding...");
                    locationsPath = path_1.default.join(process.cwd(), "scripts", "us-citystatezip.json");
                    locationsData = JSON.parse(fs_1.default.readFileSync(locationsPath, "utf8"));
                    console.log("Found ".concat(locationsData.length, " locations to import..."));
                    // Create a temporary table for bulk insertion
                    return [4 /*yield*/, sql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      CREATE TEMP TABLE temp_uslocations (\n        zip VARCHAR(10),\n        city VARCHAR(100),\n        state VARCHAR(2)\n      )\n    "], ["\n      CREATE TEMP TABLE temp_uslocations (\n        zip VARCHAR(10),\n        city VARCHAR(100),\n        state VARCHAR(2)\n      )\n    "])))];
                case 1:
                    // Create a temporary table for bulk insertion
                    _a.sent();
                    batchSize = 5000;
                    processed = 0;
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < locationsData.length)) return [3 /*break*/, 5];
                    batch = locationsData.slice(i, i + batchSize);
                    values = batch.map(function (loc) { return ({
                        zip: loc.zip,
                        city: loc.city,
                        state: loc.state,
                    }); });
                    // Insert batch into temp table
                    return [4 /*yield*/, sql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["INSERT INTO temp_uslocations ", ""], ["INSERT INTO temp_uslocations ", ""])), sql(values))];
                case 3:
                    // Insert batch into temp table
                    _a.sent();
                    processed += batch.length;
                    console.log("Processed ".concat(processed, " of ").concat(locationsData.length, " locations..."));
                    _a.label = 4;
                case 4:
                    i += batchSize;
                    return [3 /*break*/, 2];
                case 5: return [4 /*yield*/, sql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      INSERT INTO uslocations (zip, city, state)\n      SELECT DISTINCT zip, city, state FROM temp_uslocations\n      ON CONFLICT DO NOTHING\n    "], ["\n      INSERT INTO uslocations (zip, city, state)\n      SELECT DISTINCT zip, city, state FROM temp_uslocations\n      ON CONFLICT DO NOTHING\n    "])))];
                case 6:
                    result = _a.sent();
                    console.log("Successfully seeded ".concat(result.count, " unique locations into the database."));
                    // Drop temp table
                    return [4 /*yield*/, sql(templateObject_4 || (templateObject_4 = __makeTemplateObject(["DROP TABLE temp_uslocations"], ["DROP TABLE temp_uslocations"])))];
                case 7:
                    // Drop temp table
                    _a.sent();
                    return [3 /*break*/, 11];
                case 8:
                    error_1 = _a.sent();
                    console.error("Error seeding database:", error_1);
                    return [3 /*break*/, 11];
                case 9: return [4 /*yield*/, sql.end()];
                case 10:
                    _a.sent();
                    console.log("Database connection closed.");
                    return [7 /*endfinally*/];
                case 11: return [2 /*return*/];
            }
        });
    });
}
// Run the seed function
seedDatabase();
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
