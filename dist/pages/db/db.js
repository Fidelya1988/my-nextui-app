"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = exports.BaseModel = void 0;
var promises_1 = require("fs/promises");
var BaseModel = /** @class */ (function () {
    function BaseModel(definition, db) {
        this.definition = definition;
        this.db = db;
    }
    // Метод для створення нового запису
    BaseModel.prototype.create = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.db.save(this.definition.name, value)];
            });
        });
    };
    // Метод для отримання всіх записів
    BaseModel.prototype.findAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.db.findAll(this.definition.name)];
            });
        });
    };
    return BaseModel;
}());
exports.BaseModel = BaseModel;
var DB = /** @class */ (function () {
    function DB(dbPath, models) {
        this.dbPath = dbPath;
        this.models = {};
        for (var _i = 0, models_1 = models; _i < models_1.length; _i++) {
            var model = models_1[_i];
            this.models[model.name] = model;
        }
    }
    DB.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var structure, _i, _a, key, isExist;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('INIT');
                        structure = {};
                        for (_i = 0, _a = Object.keys(this.models); _i < _a.length; _i++) {
                            key = _a[_i];
                            structure[key] = [];
                        }
                        return [4 /*yield*/, this.checkFileExist()];
                    case 1:
                        isExist = _b.sent();
                        if (!!isExist) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, promises_1.writeFile)(this.dbPath, JSON.stringify(structure, null, 2), 'utf8')];
                    case 2:
                        _b.sent();
                        console.log('DB created');
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DB.prototype.readData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fileData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, promises_1.readFile)(this.dbPath, 'utf8')];
                    case 1:
                        fileData = _a.sent();
                        return [2 /*return*/, JSON.parse(fileData)];
                }
            });
        });
    };
    // Записуємо дані у файл
    DB.prototype.writeData = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, promises_1.writeFile)(this.dbPath, JSON.stringify(data, null, 2), 'utf8')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DB.prototype.checkFileExist = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, promises_1.access)(this.dbPath)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, true];
                    case 2:
                        _a = _b.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DB.prototype.save = function (modelName, value) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.readData()];
                    case 1:
                        data = _a.sent();
                        if (!data[modelName]) {
                            throw new Error("Table ".concat(modelName, " does not exist"));
                        }
                        data[modelName].push(value);
                        return [4 /*yield*/, this.writeData(data)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, value];
                }
            });
        });
    };
    DB.prototype.findAll = function (modelName) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.readData()];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data[modelName] || []];
                }
            });
        });
    };
    DB.prototype.createModel = function (model) {
        var dbInstance = this;
        return {
            create: function (value) {
                return __awaiter(this, void 0, void 0, function () {
                    var data, list, newItem;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, dbInstance.readData()];
                            case 1:
                                data = _a.sent();
                                list = data[model.name];
                                newItem = __assign(__assign({}, value), { id: list.length + 1 });
                                console.log(108, newItem);
                                list.push(newItem);
                                return [4 /*yield*/, dbInstance.writeData(data)];
                            case 2:
                                _a.sent();
                                return [2 /*return*/, newItem];
                        }
                    });
                });
            },
            findAll: function () {
                return __awaiter(this, void 0, void 0, function () {
                    var data;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, dbInstance.readData()];
                            case 1:
                                data = _a.sent();
                                console.log(111, data, model);
                                return [2 /*return*/, data[model.name]];
                        }
                    });
                });
            },
            findOne: function (fields) {
                return __awaiter(this, void 0, void 0, function () {
                    var data, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log('FIELDS DB', fields);
                                return [4 /*yield*/, dbInstance.readData()];
                            case 1:
                                data = _a.sent();
                                result = data[model.name].find(function (item) {
                                    var founded = item;
                                    for (var _i = 0, _a = Object.entries(fields); _i < _a.length; _i++) {
                                        var _b = _a[_i], key = _b[0], value = _b[1];
                                        if (item[key] != value) {
                                            founded = null;
                                        }
                                    }
                                    if (founded) {
                                        return founded;
                                    }
                                });
                                return [2 /*return*/, result];
                        }
                    });
                });
            }
        };
    };
    return DB;
}());
exports.DB = DB;
