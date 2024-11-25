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
var client_1 = require("@prisma/client");
var fs = require("fs");
var prisma = new client_1.PrismaClient();
function insertTeas() {
    return __awaiter(this, void 0, void 0, function () {
        var user, data, teas, _i, teas_1, tea, countryId, countryName, country, newTea, firstTeaType, teaType, _a, _b, ingredient, ingredientRecord, momentRecord;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, prisma.user.findUnique({
                        where: { id: 1 },
                    })];
                case 1:
                    user = _c.sent();
                    if (!!user) return [3 /*break*/, 3];
                    return [4 /*yield*/, prisma.user.create({
                            data: {
                                mail: 'admin@admin.com',
                                password: 'adminpasswordtropdureamemoriser',
                                name: 'admin',
                                urlImage: '',
                            },
                        })];
                case 2:
                    _c.sent();
                    _c.label = 3;
                case 3: return [4 /*yield*/, prisma.tea.deleteMany({
                        where: {
                            userId: 1,
                        },
                    })];
                case 4:
                    _c.sent();
                    data = fs.readFileSync('./teas.json', 'utf-8');
                    teas = JSON.parse(data);
                    _i = 0, teas_1 = teas;
                    _c.label = 5;
                case 5:
                    if (!(_i < teas_1.length)) return [3 /*break*/, 28];
                    tea = teas_1[_i];
                    countryId = null;
                    if (!(tea.country.length > 0)) return [3 /*break*/, 7];
                    countryName = tea.country[0];
                    return [4 /*yield*/, prisma.country.upsert({
                            where: { name: countryName },
                            update: {},
                            create: { name: countryName },
                        })];
                case 6:
                    country = _c.sent();
                    countryId = country.id;
                    _c.label = 7;
                case 7: return [4 /*yield*/, prisma.tea.create({
                        data: {
                            name: tea.name,
                            userId: user.id,
                            isInTeabag: true,
                            tempMin: parseInt(tea.TempMin),
                            tempMax: parseInt(tea.TempMax),
                            timeMin: parseInt(tea.TimerMin),
                            timeMax: parseInt(tea.TimerMax),
                            isBio: tea.is_bio,
                            tips: tea.tip,
                            countryId: countryId,
                            theine: 0,
                            isFavorite: false,
                        },
                    })];
                case 8:
                    newTea = _c.sent();
                    if (!(tea['Tea Type'].length > 0)) return [3 /*break*/, 13];
                    firstTeaType = tea['Tea Type'][0];
                    return [4 /*yield*/, prisma.teaType.findFirst({
                            where: { AND: [{ name: firstTeaType }, { userId: 1 }] },
                        })];
                case 9:
                    teaType = _c.sent();
                    if (!!teaType) return [3 /*break*/, 11];
                    return [4 /*yield*/, prisma.teaType.create({
                            data: { name: firstTeaType, userId: 1, urlImage: '' },
                        })];
                case 10:
                    teaType = _c.sent();
                    _c.label = 11;
                case 11: return [4 /*yield*/, prisma.hasTypes.create({
                        data: {
                            teaTypeId: teaType.id,
                            teaId: newTea.id,
                        },
                    })];
                case 12:
                    _c.sent();
                    _c.label = 13;
                case 13:
                    if (!(tea.ingredients && tea.ingredients.length > 0)) return [3 /*break*/, 20];
                    _a = 0, _b = tea.ingredients;
                    _c.label = 14;
                case 14:
                    if (!(_a < _b.length)) return [3 /*break*/, 20];
                    ingredient = _b[_a];
                    return [4 /*yield*/, prisma.ingredient.findFirst({
                            where: { AND: [{ name: ingredient }, { userId: 1 }] },
                        })];
                case 15:
                    ingredientRecord = _c.sent();
                    if (!!ingredientRecord) return [3 /*break*/, 17];
                    return [4 /*yield*/, prisma.ingredient.create({
                            data: { name: ingredient, userId: 1 },
                        })];
                case 16:
                    ingredientRecord = _c.sent();
                    _c.label = 17;
                case 17: return [4 /*yield*/, prisma.hasIngredients.create({
                        data: {
                            ingredientId: ingredientRecord.id,
                            teaId: newTea.id,
                        },
                    })];
                case 18:
                    _c.sent();
                    _c.label = 19;
                case 19:
                    _a++;
                    return [3 /*break*/, 14];
                case 20:
                    if (!(tea.images.length > 0)) return [3 /*break*/, 22];
                    return [4 /*yield*/, prisma.image.create({
                            data: {
                                urlImage: tea.images[0],
                                teaId: newTea.id,
                            },
                        })];
                case 21:
                    _c.sent();
                    _c.label = 22;
                case 22:
                    if (!(Array.isArray(tea.moment) && tea.moment.length > 0)) return [3 /*break*/, 27];
                    return [4 /*yield*/, prisma.moment.findFirst({
                            where: { AND: [{ name: tea.moment[0] }, { userId: 1 }] },
                        })];
                case 23:
                    momentRecord = _c.sent();
                    if (!!momentRecord) return [3 /*break*/, 25];
                    return [4 /*yield*/, prisma.moment.create({
                            data: { name: tea.moment[0], userId: 1, urlImage: '' },
                        })];
                case 24:
                    momentRecord = _c.sent();
                    _c.label = 25;
                case 25: return [4 /*yield*/, prisma.hasMoment.create({
                        data: {
                            momentId: momentRecord.id,
                            teaId: newTea.id,
                        },
                    })];
                case 26:
                    _c.sent();
                    _c.label = 27;
                case 27:
                    _i++;
                    return [3 /*break*/, 5];
                case 28:
                    console.log('Données des thés insérées avec succès');
                    return [2 /*return*/];
            }
        });
    });
}
insertTeas()
    .catch(function (e) {
    console.error(e);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
