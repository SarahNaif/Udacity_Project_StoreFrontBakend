"use strict";
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
exports.UserStore = void 0;
var database_1 = __importDefault(require("../database"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var saltRounds = process.env.SALT_ROUND;
var pepper = process.env.BCRYPT_PASSWORD;
var hash = function (password) {
    var salt = parseInt(saltRounds);
    return bcrypt_1.default.hashSync(password + pepper, salt);
};
var UserStore = /** @class */ (function () {
    function UserStore() {
    }
    // TASK : MAKE JWT AUTH 
    // COPY PROJECT
    // index method selects all users in users table and returns them in a list
    UserStore.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conection, sql, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conection = _a.sent();
                        sql = 'SELECT id,firstname,lastname,email FROM users';
                        return [4 /*yield*/, conection.query(sql)];
                    case 2:
                        result = _a.sent();
                        conection.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        error_1 = _a.sent();
                        throw new Error("Error Cannot show users ".concat(error_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conection, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'SELECT  id,firstname,lastname,email FROM users WHERE id=($1);';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conection = _a.sent();
                        return [4 /*yield*/, conection.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        conection.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Could not find user ".concat(id, ". Error: ").concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //  create a user and hash the password
    UserStore.prototype.create = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var conection, sql, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conection = _a.sent();
                        sql = "INSERT INTO users (firstname,lastname,email, password) VALUES($1, $2, $3, $4) RETURNING id, firstname, lastname ,email ;";
                        return [4 /*yield*/, conection.query(sql, [
                                user.firstname,
                                user.lastname,
                                user.email,
                                hash(user.password),
                            ])];
                    case 2:
                        result = _a.sent();
                        conection.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("Could not add new user ".concat(user.firstname, " . Error: ").concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.update = function (user, id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "UPDATE users\n                       SET firstname=$1, lastname=$2, password=$3 , email=$4\n                       WHERE id=($5)\n                       RETURNING id, firstname, lastname, email";
                        return [4 /*yield*/, connection.query(sql, [
                                user.firstname,
                                user.lastname,
                                user.password,
                                user.email,
                                id
                            ])];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_2 = _a.sent();
                        throw new Error("Unable to update the user with the id ".concat(id, ", ").concat(error_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conection, sql, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conection = _a.sent();
                        sql = 'DELETE FROM users WHERE id=($1) RETURNING id, firstname, lastname, email;';
                        return [4 /*yield*/, conection.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        conection.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_3 = _a.sent();
                        throw new Error("Could not delete user ".concat(id, ". Error: ").concat(err_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.authenticate = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, user, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "SELECT password FROM users WHERE email=($1)";
                        return [4 /*yield*/, conn.query(sql, [email])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        if (result.rows.length) {
                            user = result.rows[0];
                            console.log(user);
                            if (bcrypt_1.default.compareSync(password + pepper, user.password)) {
                                return [2 /*return*/, user];
                            }
                        }
                        return [2 /*return*/, null];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error("Error: ".concat(err_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return UserStore;
}());
exports.UserStore = UserStore;
