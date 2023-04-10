/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app/app.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const app_service_1 = __webpack_require__("./src/app/app.service.ts");
const auth_service_1 = __webpack_require__("./src/app/auth/auth.service.ts");
const jwt_auth_guard_1 = __webpack_require__("./src/app/auth/jwt-auth.guard.ts");
const local_auth_guard_1 = __webpack_require__("./src/app/auth/local-auth.guard.ts");
const mongoose_1 = __webpack_require__("mongoose");
const artist_service_1 = __webpack_require__("./src/app/entities/artist/artist.service.ts");
let AppController = class AppController {
    constructor(appService, authService, artistService) {
        this.appService = appService;
        this.authService = authService;
        this.artistService = artistService;
    }
    login(req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.authService.login(req.user._doc);
        });
    }
    getProfile(req) {
        return req.user;
    }
    getReccommendations(req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const results = new Array();
            const recs = yield this.appService.getReccommendations(new mongoose_1.Types.ObjectId(req.user._id));
            for (const rec of recs) {
                const artist = yield this.artistService.getArtistById(rec);
                results.push(artist);
            }
            return results;
        });
    }
    getData() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const greeting = yield this.appService.getData();
            return greeting;
        });
    }
};
tslib_1.__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('auth/login'),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AppController.prototype, "login", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('profile'),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "getProfile", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('reccommendations'),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AppController.prototype, "getReccommendations", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], AppController.prototype, "getData", null);
AppController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object, typeof (_b = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _b : Object, typeof (_c = typeof artist_service_1.ArtistService !== "undefined" && artist_service_1.ArtistService) === "function" ? _c : Object])
], AppController);
exports.AppController = AppController;


/***/ }),

/***/ "./src/app/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const app_controller_1 = __webpack_require__("./src/app/app.controller.ts");
const app_service_1 = __webpack_require__("./src/app/app.service.ts");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const user_module_1 = __webpack_require__("./src/app/entities/user/user.module.ts");
const concert_module_1 = __webpack_require__("./src/app/entities/concert/concert.module.ts");
const venue_module_1 = __webpack_require__("./src/app/entities/venue/venue.module.ts");
const auth_module_1 = __webpack_require__("./src/app/auth/auth.module.ts");
const artist_module_1 = __webpack_require__("./src/app/entities/artist/artist.module.ts");
const neo4j_module_1 = __webpack_require__("./src/app/entities/neo4j/neo4j.module.ts");
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forRoot('mongodb://127.0.0.1:27017/avansTickz'),
            neo4j_module_1.Neo4jModule.forRoot({
                scheme: 'neo4j',
                host: 'localhost',
                port: 7687,
                username: 'neo4j',
                password: 'neo'
            }),
            user_module_1.UserModule, concert_module_1.ConcertModule, venue_module_1.VenueModule, artist_module_1.ArtistModule, auth_module_1.AuthModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./src/app/app.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const neo4j_service_1 = __webpack_require__("./src/app/entities/neo4j/neo4j.service.ts");
let AppService = class AppService {
    /**
     *
     */
    constructor(neo4jService) {
        this.neo4jService = neo4jService;
    }
    getData() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.neo4jService.read('MATCH(n) RETURN count(n) AS count', {});
            const count = result.records[0].get('count');
            return `Hello Neo4j user! There are ${count} nodes in the database`;
        });
    }
    getReccommendations(loggedInUserId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const recs = yield this.neo4jService.read(`MATCH (me:User {id: '${loggedInUserId}'})-[:FOLLOWS]->(following:User)-[:LIKES]->(artist:Artist)
      WHERE NOT EXISTS((:User {id: '${loggedInUserId}'})-[:LIKES]->(artist))
      RETURN DISTINCT artist.id`);
            const ids = recs.records.map(record => record.get("artist.id"));
            return ids;
        });
    }
};
AppService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof neo4j_service_1.Neo4jService !== "undefined" && neo4j_service_1.Neo4jService) === "function" ? _a : Object])
], AppService);
exports.AppService = AppService;


/***/ }),

/***/ "./src/app/auth/auth.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const auth_service_1 = __webpack_require__("./src/app/auth/auth.service.ts");
const user_module_1 = __webpack_require__("./src/app/entities/user/user.module.ts");
const passport_1 = __webpack_require__("@nestjs/passport");
const local_strategy_1 = __webpack_require__("./src/app/auth/local.strategy.ts");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const constants_1 = __webpack_require__("./src/app/auth/constants.ts");
const jwt_strategy_1 = __webpack_require__("./src/app/auth/jwt.strategy.ts");
let AuthModule = class AuthModule {
};
AuthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: constants_1.jwtConstants.secret,
                signOptions: { expiresIn: '30d' },
            }),
        ],
        providers: [auth_service_1.AuthService, local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),

/***/ "./src/app/auth/auth.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const user_service_1 = __webpack_require__("./src/app/entities/user/user.service.ts");
const jwt_1 = __webpack_require__("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    validateUser(username, pass) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUserByEmail(username);
            if (user && user.password === pass) {
                const { password } = user, result = tslib_1.__rest(user, ["password"]);
                return result;
            }
            return null;
        });
    }
    login(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const payload = { emailAdres: user.emailAdres, sub: user._id, firstName: user.firstName, lastName: user.lastName, birthDate: user.birthDate };
            // console.log(payload)
            return {
                access_token: this.jwtService.sign(payload),
            };
        });
    }
};
AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], AuthService);
exports.AuthService = AuthService;


/***/ }),

/***/ "./src/app/auth/constants.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.jwtConstants = void 0;
exports.jwtConstants = {
    secret: 'secretKey',
};


/***/ }),

/***/ "./src/app/auth/jwt-auth.guard.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const passport_1 = __webpack_require__("@nestjs/passport");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
};
JwtAuthGuard = tslib_1.__decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;


/***/ }),

/***/ "./src/app/auth/jwt.strategy.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const tslib_1 = __webpack_require__("tslib");
const passport_jwt_1 = __webpack_require__("passport-jwt");
const passport_1 = __webpack_require__("@nestjs/passport");
const common_1 = __webpack_require__("@nestjs/common");
const constants_1 = __webpack_require__("./src/app/auth/constants.ts");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: constants_1.jwtConstants.secret
        });
    }
    validate(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // console.log(payload)
            // console.log(ExtractJwt.fromAuthHeaderAsBearerToken.toString())
            return { _id: payload.sub, emailAdres: payload.emailAdres, firstName: payload.firstName, lastName: payload.lastName, birthDate: payload.birthDate };
        });
    }
};
JwtStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;


/***/ }),

/***/ "./src/app/auth/local-auth.guard.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalAuthGuard = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const passport_1 = __webpack_require__("@nestjs/passport");
let LocalAuthGuard = class LocalAuthGuard extends (0, passport_1.AuthGuard)('local') {
};
LocalAuthGuard = tslib_1.__decorate([
    (0, common_1.Injectable)()
], LocalAuthGuard);
exports.LocalAuthGuard = LocalAuthGuard;


/***/ }),

/***/ "./src/app/auth/local.strategy.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalStrategy = void 0;
const tslib_1 = __webpack_require__("tslib");
const passport_local_1 = __webpack_require__("passport-local");
const passport_1 = __webpack_require__("@nestjs/passport");
const common_1 = __webpack_require__("@nestjs/common");
const auth_service_1 = __webpack_require__("./src/app/auth/auth.service.ts");
let LocalStrategy = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor(authService) {
        super();
        this.authService = authService;
    }
    validate(username, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.authService.validateUser(username, password);
            if (!user) {
                console.log('no user found');
                throw new common_1.UnauthorizedException();
            }
            return user;
        });
    }
};
LocalStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], LocalStrategy);
exports.LocalStrategy = LocalStrategy;


/***/ }),

/***/ "./src/app/entities/artist/artist.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ArtistController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const create_artist_dto_1 = __webpack_require__("./src/app/entities/artist/dto/create-artist.dto.ts");
const update_artist_dto_1 = __webpack_require__("./src/app/entities/artist/dto/update-artist.dto.ts");
const artist_service_1 = __webpack_require__("./src/app/entities/artist/artist.service.ts");
const mongoose_1 = __webpack_require__("mongoose");
let ArtistController = class ArtistController {
    constructor(artistService) {
        this.artistService = artistService;
    }
    getArtist(artistId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.artistService.getArtistById(artistId);
        });
    }
    getArtists() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.artistService.getAllArtists();
        });
    }
    createArtist(createArtistDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.artistService.createArtist(createArtistDto.name, createArtistDto.birthDate, createArtistDto.genre, createArtistDto.description, createArtistDto.artistImage, createArtistDto.artistHeader, createArtistDto.creatorId);
        });
    }
    updateArtist(artistId, updateArtistDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.artistService.updateArtist(artistId, updateArtistDto);
        });
    }
    deleteArtist(artistId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // console.log('deleteArtist aangeroepen')
            return yield this.artistService.deleteArtistById(artistId);
        });
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(':artistId'),
    tslib_1.__param(0, (0, common_1.Param)('artistId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], ArtistController.prototype, "getArtist", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ArtistController.prototype, "getArtists", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof create_artist_dto_1.CreateArtistDto !== "undefined" && create_artist_dto_1.CreateArtistDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], ArtistController.prototype, "createArtist", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':artistId'),
    tslib_1.__param(0, (0, common_1.Param)('artistId')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof mongoose_1.Types !== "undefined" && mongoose_1.Types.ObjectId) === "function" ? _f : Object, typeof (_g = typeof update_artist_dto_1.UpdateArtistDto !== "undefined" && update_artist_dto_1.UpdateArtistDto) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], ArtistController.prototype, "updateArtist", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':artistId'),
    tslib_1.__param(0, (0, common_1.Param)('artistId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ArtistController.prototype, "deleteArtist", null);
ArtistController = tslib_1.__decorate([
    (0, common_1.Controller)('artists'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof artist_service_1.ArtistService !== "undefined" && artist_service_1.ArtistService) === "function" ? _a : Object])
], ArtistController);
exports.ArtistController = ArtistController;


/***/ }),

/***/ "./src/app/entities/artist/artist.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ArtistModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const neo4j_module_1 = __webpack_require__("./src/app/entities/neo4j/neo4j.module.ts");
const artist_controller_1 = __webpack_require__("./src/app/entities/artist/artist.controller.ts");
const artist_repository_1 = __webpack_require__("./src/app/entities/artist/artist.repository.ts");
const artist_schema_1 = __webpack_require__("./src/app/entities/artist/artist.schema.ts");
const artist_service_1 = __webpack_require__("./src/app/entities/artist/artist.service.ts");
let ArtistModule = class ArtistModule {
};
ArtistModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: artist_schema_1.Artist.name, schema: artist_schema_1.ArtistSchema }]),
            neo4j_module_1.Neo4jModule.forRoot({
                scheme: 'neo4j',
                host: 'localhost',
                port: 7687,
                username: 'neo4j',
                password: 'neo'
            }),],
        controllers: [artist_controller_1.ArtistController],
        providers: [artist_service_1.ArtistService, artist_repository_1.ArtistRepository],
        exports: [artist_service_1.ArtistService]
    })
], ArtistModule);
exports.ArtistModule = ArtistModule;


/***/ }),

/***/ "./src/app/entities/artist/artist.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ArtistRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
const artist_schema_1 = __webpack_require__("./src/app/entities/artist/artist.schema.ts");
const mongoose_3 = __webpack_require__("mongoose");
const neo4j_service_1 = __webpack_require__("./src/app/entities/neo4j/neo4j.service.ts");
let ArtistRepository = class ArtistRepository {
    constructor(artistModel, neo4jService) {
        this.artistModel = artistModel;
        this.neo4jService = neo4jService;
    }
    findById(artistId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.artistModel.findOne({ _id: new mongoose_3.Types.ObjectId(artistId) });
        });
    }
    find(artistFilterQuery) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.artistModel.find(artistFilterQuery);
        });
    }
    create(artist) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newArtist = yield new this.artistModel(artist).save();
            const artistNeo = yield this.neo4jService.write(`CREATE (:Artist {id: '${newArtist._id}'})`);
            return newArtist;
        });
    }
    findOneAndUpdate(artistFilterQuery, artist) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.artistModel.findOneAndUpdate(artistFilterQuery, artist, { new: true });
        });
    }
    deleteById(artistId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.artistModel.deleteOne({ _id: new mongoose_3.Types.ObjectId(artistId) });
        });
    }
};
ArtistRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(artist_schema_1.Artist.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof neo4j_service_1.Neo4jService !== "undefined" && neo4j_service_1.Neo4jService) === "function" ? _b : Object])
], ArtistRepository);
exports.ArtistRepository = ArtistRepository;


/***/ }),

/***/ "./src/app/entities/artist/artist.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ArtistSchema = exports.Artist = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
let Artist = class Artist {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Artist.prototype, "name", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Artist.prototype, "birthDate", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Artist.prototype, "genre", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Artist.prototype, "description", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _b : Object)
], Artist.prototype, "creatorId", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Artist.prototype, "artistImage", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Artist.prototype, "artistHeader", void 0);
Artist = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Artist);
exports.Artist = Artist;
exports.ArtistSchema = mongoose_1.SchemaFactory.createForClass(Artist);


/***/ }),

/***/ "./src/app/entities/artist/artist.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ArtistService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const artist_repository_1 = __webpack_require__("./src/app/entities/artist/artist.repository.ts");
let ArtistService = class ArtistService {
    constructor(artistRepository) {
        this.artistRepository = artistRepository;
    }
    getArtistById(artistId) {
        return this.artistRepository.findById(artistId);
    }
    getAllArtists() {
        return this.artistRepository.find({});
    }
    createArtist(name, birthDate, genre, description, artistImage, artistHeader, creatorId) {
        return this.artistRepository.create({
            name,
            birthDate,
            genre,
            description,
            artistImage,
            artistHeader,
            creatorId
        });
    }
    updateArtist(artistId, artistUpdates) {
        return this.artistRepository.findOneAndUpdate({ _id: artistId }, artistUpdates);
    }
    deleteArtistById(artistId) {
        return this.artistRepository.deleteById(artistId);
    }
};
ArtistService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof artist_repository_1.ArtistRepository !== "undefined" && artist_repository_1.ArtistRepository) === "function" ? _a : Object])
], ArtistService);
exports.ArtistService = ArtistService;


/***/ }),

/***/ "./src/app/entities/artist/dto/create-artist.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateArtistDto = void 0;
class CreateArtistDto {
}
exports.CreateArtistDto = CreateArtistDto;


/***/ }),

/***/ "./src/app/entities/artist/dto/update-artist.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateArtistDto = void 0;
class UpdateArtistDto {
}
exports.UpdateArtistDto = UpdateArtistDto;


/***/ }),

/***/ "./src/app/entities/concert/concert.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConcertController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const create_concert_dto_1 = __webpack_require__("./src/app/entities/concert/dto/create-concert.dto.ts");
const update_concert_dto_1 = __webpack_require__("./src/app/entities/concert/dto/update-concert.dto.ts");
const concert_service_1 = __webpack_require__("./src/app/entities/concert/concert.service.ts");
const mongoose_1 = __webpack_require__("mongoose");
let ConcertController = class ConcertController {
    constructor(concertService) {
        this.concertService = concertService;
    }
    getConcert(concertId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.concertService.getConcertById(concertId);
        });
    }
    getConcertByName(name) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.concertService.getConcertByName(name);
        });
    }
    getConcerts() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.concertService.getAllConcerts();
        });
    }
    createConcert(createConcertDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // console.log("controller aangeroepen")
            return this.concertService.createConcert(createConcertDto.title, createConcertDto.date, createConcertDto.time, createConcertDto.amountOfTickets, createConcertDto.artist, createConcertDto.tickets, createConcertDto.ticketPrice, createConcertDto.ticketType, createConcertDto.venue, createConcertDto.creatorId);
        });
    }
    updateConcert(concertId, updateConcertDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.concertService.updateConcert(concertId, updateConcertDto);
        });
    }
    deleteConcert(concertId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // console.log('deleteConcert aangeroepen')
            return yield this.concertService.deleteConcertById(concertId);
        });
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(':concertId'),
    tslib_1.__param(0, (0, common_1.Param)('concertId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], ConcertController.prototype, "getConcert", null);
tslib_1.__decorate([
    (0, common_1.Get)('/name/:name'),
    tslib_1.__param(0, (0, common_1.Param)('name')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ConcertController.prototype, "getConcertByName", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], ConcertController.prototype, "getConcerts", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof create_concert_dto_1.CreateConcertDto !== "undefined" && create_concert_dto_1.CreateConcertDto) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], ConcertController.prototype, "createConcert", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':concertId'),
    tslib_1.__param(0, (0, common_1.Param)('concertId')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof mongoose_1.Types !== "undefined" && mongoose_1.Types.ObjectId) === "function" ? _g : Object, typeof (_h = typeof update_concert_dto_1.UpdateConcertDto !== "undefined" && update_concert_dto_1.UpdateConcertDto) === "function" ? _h : Object]),
    tslib_1.__metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], ConcertController.prototype, "updateConcert", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':concertId'),
    tslib_1.__param(0, (0, common_1.Param)('concertId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ConcertController.prototype, "deleteConcert", null);
ConcertController = tslib_1.__decorate([
    (0, common_1.Controller)('concerts'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof concert_service_1.ConcertService !== "undefined" && concert_service_1.ConcertService) === "function" ? _a : Object])
], ConcertController);
exports.ConcertController = ConcertController;


/***/ }),

/***/ "./src/app/entities/concert/concert.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConcertModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const concert_controller_1 = __webpack_require__("./src/app/entities/concert/concert.controller.ts");
const concert_repository_1 = __webpack_require__("./src/app/entities/concert/concert.repository.ts");
const concert_schema_1 = __webpack_require__("./src/app/entities/concert/concert.schema.ts");
const concert_service_1 = __webpack_require__("./src/app/entities/concert/concert.service.ts");
let ConcertModule = class ConcertModule {
};
ConcertModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: concert_schema_1.Concert.name, schema: concert_schema_1.ConcertSchema }])],
        controllers: [concert_controller_1.ConcertController],
        providers: [concert_service_1.ConcertService, concert_repository_1.ConcertRepository]
    })
], ConcertModule);
exports.ConcertModule = ConcertModule;


/***/ }),

/***/ "./src/app/entities/concert/concert.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConcertRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
const concert_schema_1 = __webpack_require__("./src/app/entities/concert/concert.schema.ts");
const mongoose_3 = __webpack_require__("mongoose");
let ConcertRepository = class ConcertRepository {
    constructor(concertModel) {
        this.concertModel = concertModel;
    }
    findById(concertId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.concertModel.findOne({ _id: new mongoose_3.Types.ObjectId(concertId) }).populate('venue').populate('artist');
        });
    }
    findByName(name) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.concertModel.findOne({ title: name }).populate('venue').populate('artist');
        });
    }
    find(concertFilterQuery) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.concertModel.find(concertFilterQuery).populate('venue').populate('artist');
        });
    }
    create(concert) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // console.log(concert);
            const newConcert = new this.concertModel(concert);
            return yield newConcert.save();
        });
    }
    findOneAndUpdate(concertFilterQuery, concert) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.concertModel.findOneAndUpdate(concertFilterQuery, concert, { new: true });
        });
    }
    deleteById(concertId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.concertModel.deleteOne({ _id: new mongoose_3.Types.ObjectId(concertId) });
        });
    }
};
ConcertRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(concert_schema_1.Concert.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], ConcertRepository);
exports.ConcertRepository = ConcertRepository;


/***/ }),

/***/ "./src/app/entities/concert/concert.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConcertSchema = exports.Concert = void 0;
const tslib_1 = __webpack_require__("tslib");
const venue_schema_1 = __webpack_require__("./src/app/entities/venue/venue.schema.ts");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
const artist_schema_1 = __webpack_require__("./src/app/entities/artist/artist.schema.ts");
const ticket_schema_1 = __webpack_require__("./src/app/entities/ticket/ticket.schema.ts");
let Concert = class Concert {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Concert.prototype, "title", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Concert.prototype, "date", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Concert.prototype, "time", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Number)
], Concert.prototype, "amountOfTickets", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Artist' }),
    tslib_1.__metadata("design:type", typeof (_b = typeof artist_schema_1.Artist !== "undefined" && artist_schema_1.Artist) === "function" ? _b : Object)
], Concert.prototype, "artist", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)([ticket_schema_1.Ticket]),
    tslib_1.__metadata("design:type", Array)
], Concert.prototype, "tickets", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Venue' }),
    tslib_1.__metadata("design:type", typeof (_c = typeof venue_schema_1.Venue !== "undefined" && venue_schema_1.Venue) === "function" ? _c : Object)
], Concert.prototype, "venue", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_d = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _d : Object)
], Concert.prototype, "creatorId", void 0);
Concert = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Concert);
exports.Concert = Concert;
exports.ConcertSchema = mongoose_1.SchemaFactory.createForClass(Concert);


/***/ }),

/***/ "./src/app/entities/concert/concert.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConcertService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const concert_repository_1 = __webpack_require__("./src/app/entities/concert/concert.repository.ts");
const mongoose_1 = __webpack_require__("mongoose");
let ConcertService = class ConcertService {
    constructor(concertRepository) {
        this.concertRepository = concertRepository;
    }
    getConcertById(concertId) {
        return this.concertRepository.findById(concertId);
    }
    getConcertByName(name) {
        return this.concertRepository.findByName(name);
    }
    getAllConcerts() {
        return this.concertRepository.find({});
    }
    createConcert(title, date, time, amountOfTickets, artist, tickets, ticketPrice, ticketType, venue, creatorId) {
        for (let i = 0; i < amountOfTickets; i++) {
            tickets.push({
                _id: new mongoose_1.Types.ObjectId(i),
                price: ticketPrice,
                type: ticketType,
                concertName: title,
            });
        }
        return this.concertRepository.create({
            title,
            date,
            time,
            amountOfTickets,
            artist,
            tickets: tickets,
            venue,
            creatorId,
        });
    }
    updateConcert(concertId, concertUpdates) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let concert = yield this.concertRepository.findById(concertId.toString());
            if ((concertUpdates.amountOfTickets == undefined)) {
                concertUpdates.tickets = [];
                concert.tickets.forEach((ticket) => {
                    concertUpdates.tickets.push(ticket);
                });
            }
            else if (concertUpdates.amountOfTickets != concert.tickets.length) {
                concertUpdates.tickets = [];
                for (let i = 0; i < concertUpdates.amountOfTickets; i++) {
                    concertUpdates.tickets.push({
                        _id: new mongoose_1.Types.ObjectId(i),
                        price: concert.tickets[0].price,
                        type: concert.tickets[0].type,
                        concertName: concert.title,
                    });
                }
            }
            return this.concertRepository.findOneAndUpdate({ _id: concertId }, concertUpdates);
        });
    }
    deleteConcertById(concertId) {
        return this.concertRepository.deleteById(concertId);
    }
};
ConcertService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof concert_repository_1.ConcertRepository !== "undefined" && concert_repository_1.ConcertRepository) === "function" ? _a : Object])
], ConcertService);
exports.ConcertService = ConcertService;


/***/ }),

/***/ "./src/app/entities/concert/dto/create-concert.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateConcertDto = void 0;
class CreateConcertDto {
}
exports.CreateConcertDto = CreateConcertDto;


/***/ }),

/***/ "./src/app/entities/concert/dto/update-concert.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateConcertDto = void 0;
class UpdateConcertDto {
}
exports.UpdateConcertDto = UpdateConcertDto;


/***/ }),

/***/ "./src/app/entities/neo4j/neo4j-config.interface.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./src/app/entities/neo4j/neo4j.constants.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NEO4J_DRIVER = exports.NEO4J_CONFIG = void 0;
exports.NEO4J_CONFIG = 'NEO4J_CONFIG';
exports.NEO4J_DRIVER = 'NEO4J_DRIVER';


/***/ }),

/***/ "./src/app/entities/neo4j/neo4j.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var Neo4jModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Neo4jModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const neo4j_constants_1 = __webpack_require__("./src/app/entities/neo4j/neo4j.constants.ts");
const neo4j_service_1 = __webpack_require__("./src/app/entities/neo4j/neo4j.service.ts");
const neo4j_util_1 = __webpack_require__("./src/app/entities/neo4j/neo4j.util.ts");
let Neo4jModule = Neo4jModule_1 = class Neo4jModule {
    static forRoot(config) {
        return {
            module: Neo4jModule_1,
            providers: [
                neo4j_service_1.Neo4jService,
                {
                    provide: neo4j_constants_1.NEO4J_CONFIG,
                    useValue: config
                },
                {
                    provide: neo4j_constants_1.NEO4J_DRIVER,
                    inject: [neo4j_constants_1.NEO4J_CONFIG],
                    useFactory: (config) => tslib_1.__awaiter(this, void 0, void 0, function* () { return (0, neo4j_util_1.createDriver)(config); }),
                }
            ],
            exports: [
                neo4j_service_1.Neo4jService,
            ]
        };
    }
};
Neo4jModule = Neo4jModule_1 = tslib_1.__decorate([
    (0, common_1.Module)({})
], Neo4jModule);
exports.Neo4jModule = Neo4jModule;


/***/ }),

/***/ "./src/app/entities/neo4j/neo4j.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Neo4jService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const neo4j_driver_1 = __webpack_require__("neo4j-driver");
const neo4j_config_interface_1 = __webpack_require__("./src/app/entities/neo4j/neo4j-config.interface.ts");
const neo4j_constants_1 = __webpack_require__("./src/app/entities/neo4j/neo4j.constants.ts");
let Neo4jService = class Neo4jService {
    constructor(config, driver) {
        this.config = config;
        this.driver = driver;
    }
    getDriver() {
        return this.driver;
    }
    getConfig() {
        return this.config;
    }
    getReadSession(database) {
        return this.driver.session({
            database: database || this.config.database,
            defaultAccessMode: neo4j_driver_1.default.session.READ
        });
    }
    getWriteSession(database) {
        return this.driver.session({
            database: database || this.config.database,
            defaultAccessMode: neo4j_driver_1.default.session.WRITE
        });
    }
    read(cypher, params, database) {
        const session = this.getReadSession(database);
        return session.run(cypher, params);
    }
    write(cypher, params, database) {
        const session = this.getWriteSession(database);
        return session.run(cypher, params);
    }
};
Neo4jService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)(neo4j_constants_1.NEO4J_CONFIG)),
    tslib_1.__param(1, (0, common_1.Inject)(neo4j_constants_1.NEO4J_DRIVER)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof neo4j_config_interface_1.Neo4jConfig !== "undefined" && neo4j_config_interface_1.Neo4jConfig) === "function" ? _a : Object, typeof (_b = typeof neo4j_driver_1.Driver !== "undefined" && neo4j_driver_1.Driver) === "function" ? _b : Object])
], Neo4jService);
exports.Neo4jService = Neo4jService;


/***/ }),

/***/ "./src/app/entities/neo4j/neo4j.util.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createDriver = void 0;
const tslib_1 = __webpack_require__("tslib");
const neo4j_driver_1 = __webpack_require__("neo4j-driver");
const createDriver = (config) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const driver = neo4j_driver_1.default.driver(`${config.scheme}://${config.host}:${config.port}`, neo4j_driver_1.default.auth.basic(config.username, config.password));
    yield driver.verifyConnectivity();
    return driver;
});
exports.createDriver = createDriver;


/***/ }),

/***/ "./src/app/entities/ticket/ticket.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Ticket = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
let Ticket = class Ticket {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _a : Object)
], Ticket.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Number !== "undefined" && Number) === "function" ? _b : Object)
], Ticket.prototype, "price", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Ticket.prototype, "type", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Ticket.prototype, "concertName", void 0);
Ticket = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Ticket);
exports.Ticket = Ticket;


/***/ }),

/***/ "./src/app/entities/user/dto/create-user.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateUserDto = void 0;
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;


/***/ }),

/***/ "./src/app/entities/user/dto/update-user.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUserDto = void 0;
class UpdateUserDto {
}
exports.UpdateUserDto = UpdateUserDto;


/***/ }),

/***/ "./src/app/entities/user/user.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const create_user_dto_1 = __webpack_require__("./src/app/entities/user/dto/create-user.dto.ts");
const update_user_dto_1 = __webpack_require__("./src/app/entities/user/dto/update-user.dto.ts");
const user_service_1 = __webpack_require__("./src/app/entities/user/user.service.ts");
const mongoose_1 = __webpack_require__("mongoose");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getUser(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.userService.getUserById(userId);
        });
    }
    getUserByEmail(email) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // console.log(email)
            return yield this.userService.getUserByEmail(email);
        });
    }
    getUsers() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.userService.getAllUsers();
        });
    }
    createUser(createUserDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.userService.createUser(createUserDto.firstName, createUserDto.lastName, createUserDto.birthDate, createUserDto.emailAdres, createUserDto.password);
        });
    }
    updateUser(userId, updateUserDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // console.log('controller updates:')
            // console.log(updateUserDto.favoriteArtists)
            return this.userService.updateUser(userId, updateUserDto);
        });
    }
    //Favorite
    addToFavorite(loggedInUser, artistId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.userService.addToFavorite(loggedInUser._id, artistId);
        });
    }
    removeFromFavorite(loggedInUser, artistId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.userService.removeFromFavorite(loggedInUser._id, artistId);
        });
    }
    //Follow
    follow(loggedInUser, followUserId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.userService.follow(loggedInUser._id, followUserId);
        });
    }
    //Unfollow
    unfollow(loggedInUser, followUserId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.userService.unfollow(loggedInUser._id, followUserId);
        });
    }
    deleteUser(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // console.log('deleteUser aangeroepen')
            return yield this.userService.deleteUserById(userId);
        });
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(':userId'),
    tslib_1.__param(0, (0, common_1.Param)('userId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], UserController.prototype, "getUser", null);
tslib_1.__decorate([
    (0, common_1.Get)('/email/:email'),
    tslib_1.__param(0, (0, common_1.Param)('email')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], UserController.prototype, "getUserByEmail", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], UserController.prototype, "getUsers", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof create_user_dto_1.CreateUserDto !== "undefined" && create_user_dto_1.CreateUserDto) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], UserController.prototype, "createUser", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':userId'),
    tslib_1.__param(0, (0, common_1.Param)('userId')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof mongoose_1.Types !== "undefined" && mongoose_1.Types.ObjectId) === "function" ? _g : Object, typeof (_h = typeof update_user_dto_1.UpdateUserDto !== "undefined" && update_user_dto_1.UpdateUserDto) === "function" ? _h : Object]),
    tslib_1.__metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], UserController.prototype, "updateUser", null);
tslib_1.__decorate([
    (0, common_1.Post)('/favorite/:id'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String]),
    tslib_1.__metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], UserController.prototype, "addToFavorite", null);
tslib_1.__decorate([
    (0, common_1.Post)('/unfavorite/:id'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String]),
    tslib_1.__metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], UserController.prototype, "removeFromFavorite", null);
tslib_1.__decorate([
    (0, common_1.Post)('/follow/:id'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String]),
    tslib_1.__metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], UserController.prototype, "follow", null);
tslib_1.__decorate([
    (0, common_1.Post)('/unfollow/:id'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String]),
    tslib_1.__metadata("design:returntype", typeof (_o = typeof Promise !== "undefined" && Promise) === "function" ? _o : Object)
], UserController.prototype, "unfollow", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':userId'),
    tslib_1.__param(0, (0, common_1.Param)('userId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
UserController = tslib_1.__decorate([
    (0, common_1.Controller)('users'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object])
], UserController);
exports.UserController = UserController;


/***/ }),

/***/ "./src/app/entities/user/user.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const neo4j_module_1 = __webpack_require__("./src/app/entities/neo4j/neo4j.module.ts");
const user_controller_1 = __webpack_require__("./src/app/entities/user/user.controller.ts");
const user_repository_1 = __webpack_require__("./src/app/entities/user/user.repository.ts");
const user_schema_1 = __webpack_require__("./src/app/entities/user/user.schema.ts");
const user_service_1 = __webpack_require__("./src/app/entities/user/user.service.ts");
let UserModule = class UserModule {
};
UserModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]),
            neo4j_module_1.Neo4jModule.forRoot({
                scheme: 'neo4j',
                host: 'localhost',
                port: 7687,
                username: 'neo4j',
                password: 'neo'
            }),],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, user_repository_1.UserRepository],
        exports: [user_service_1.UserService]
    })
], UserModule);
exports.UserModule = UserModule;


/***/ }),

/***/ "./src/app/entities/user/user.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
const user_schema_1 = __webpack_require__("./src/app/entities/user/user.schema.ts");
const mongoose_3 = __webpack_require__("mongoose");
const neo4j_service_1 = __webpack_require__("./src/app/entities/neo4j/neo4j.service.ts");
let UserRepository = class UserRepository {
    constructor(userModel, neo4jService) {
        this.userModel = userModel;
        this.neo4jService = neo4jService;
    }
    findById(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.findOne({ _id: new mongoose_3.Types.ObjectId(userId) });
        });
    }
    findByEmail(email) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.findOne({ emailAdres: email });
        });
    }
    find(usersFilterQuery) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.find(usersFilterQuery);
        });
    }
    create(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newUser = yield new this.userModel(user).save();
            // const newUser = this.userModel.create(user);
            const userNeo = yield this.neo4jService.write(`CREATE (:User {id: '${newUser._id}'})`);
            //     const categoryNeo = await this.neo4jService.write(MERGE (:Category {name: "${ticketdb.category.name}"}))
            //     const relationNeo = await this.neo4jService.write(MATCH (t:Ticket {id: "${ticketdb.id}"}), (c:Category {name: "${ticketdb.category.name}"}) CREATE (t)-[:BELONGS_TO]->(c))
            return newUser;
        });
    }
    findOneAndUpdate(userFilterQuery, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // console.log(userFilterQuery)
            // console.log(user)
            return yield this.userModel.findOneAndUpdate(userFilterQuery, user, {
                new: true,
            });
        });
    }
    deleteById(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.deleteOne({ _id: new mongoose_3.Types.ObjectId(userId) });
        });
    }
    addToFavorite(loggedInUserId, artistId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.neo4jService.write(`MATCH (follower:User {id: '${loggedInUserId}'})
      MATCH (artist:Artist {id: '${artistId}'})
      MERGE (follower)-[:LIKES]->(artist)`);
            const updatedUser = this.userModel.findOneAndUpdate({ _id: loggedInUserId }, { $push: { favoriteArtists: artistId._id } }, { new: true });
            return updatedUser;
        });
    }
    removeFromFavorite(loggedInUserId, artistId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.neo4jService.write(`MATCH (a)-[r:LIKES]->(b)
      WHERE a.id = '${loggedInUserId}' AND b.id = '${artistId}'
      DELETE r`);
            const updatedUser = this.userModel.findOneAndUpdate({ _id: loggedInUserId }, { $pull: { favoriteArtists: artistId } }, { new: true });
            return updatedUser;
        });
    }
    follow(loggedInUserId, followUserId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.neo4jService.write(`MATCH (follower:User {id: '${loggedInUserId}'})
      MATCH (following:User {id: '${followUserId}'})
      MERGE (follower)-[:FOLLOWS]->(following)`);
            const updatedUser = this.userModel.findOneAndUpdate({ _id: loggedInUserId }, { $push: { following: followUserId._id } }, { new: true });
            return updatedUser;
        });
    }
    unfollow(loggedInUserId, unFollowUserId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.neo4jService.write(`MATCH (a)-[r:FOLLOWS]->(b)
      WHERE a.id = '${loggedInUserId}' AND b.id = '${unFollowUserId}'
      DELETE r`);
            const updatedUser = this.userModel.findOneAndUpdate({ _id: loggedInUserId }, { $pull: { following: unFollowUserId } }, { new: true });
            return updatedUser;
        });
    }
};
UserRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof neo4j_service_1.Neo4jService !== "undefined" && neo4j_service_1.Neo4jService) === "function" ? _b : Object])
], UserRepository);
exports.UserRepository = UserRepository;


/***/ }),

/***/ "./src/app/entities/user/user.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserSchema = exports.User = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const ticket_schema_1 = __webpack_require__("./src/app/entities/ticket/ticket.schema.ts");
let User = class User {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], User.prototype, "birthDate", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "emailAdres", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "favoriteArtists", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)([ticket_schema_1.Ticket]),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "myTickets", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        default: [],
        ref: 'User',
    }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "following", void 0);
User = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);


/***/ }),

/***/ "./src/app/entities/user/user.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const user_repository_1 = __webpack_require__("./src/app/entities/user/user.repository.ts");
const mongoose_1 = __webpack_require__("mongoose");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    getUserById(userId) {
        return this.userRepository.findById(userId);
    }
    getUserByEmail(emailAdres) {
        return this.userRepository.findByEmail(emailAdres);
    }
    getAllUsers() {
        return this.userRepository.find({});
    }
    createUser(firstName, lastName, birthDate, emailAdres, password) {
        return this.userRepository.create({
            firstName,
            lastName,
            birthDate,
            emailAdres,
            password,
            favoriteArtists: [],
            myTickets: [],
            following: [],
        });
    }
    updateUser(userId, userUpdates) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let user = yield this.userRepository.findById(userId.toString());
            if (userUpdates.favoriteArtists == undefined) {
                userUpdates.favoriteArtists = [];
                user.favoriteArtists.forEach((artist) => {
                    userUpdates.favoriteArtists.push(artist);
                });
            }
            if (userUpdates.myTickets == undefined) {
                userUpdates.myTickets = [];
                user.myTickets.forEach((ticket) => {
                    userUpdates.myTickets.push(ticket);
                });
            }
            return this.userRepository.findOneAndUpdate({ _id: userId }, userUpdates);
        });
    }
    deleteUserById(userId) {
        return this.userRepository.deleteById(userId);
    }
    addToFavorite(loggedInUserId, artistId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.userRepository.addToFavorite(loggedInUserId, new mongoose_1.Types.ObjectId(artistId));
        });
    }
    removeFromFavorite(loggedInUserId, artistId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.userRepository.removeFromFavorite(loggedInUserId, new mongoose_1.Types.ObjectId(artistId));
        });
    }
    follow(loggedInUserId, followUserId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.userRepository.follow(loggedInUserId, new mongoose_1.Types.ObjectId(followUserId));
        });
    }
    unfollow(loggedInUserId, unFollowUserId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.userRepository.unfollow(loggedInUserId, new mongoose_1.Types.ObjectId(unFollowUserId));
        });
    }
};
UserService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof user_repository_1.UserRepository !== "undefined" && user_repository_1.UserRepository) === "function" ? _a : Object])
], UserService);
exports.UserService = UserService;


/***/ }),

/***/ "./src/app/entities/venue/dto/create-venue.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateVenueDto = void 0;
class CreateVenueDto {
}
exports.CreateVenueDto = CreateVenueDto;


/***/ }),

/***/ "./src/app/entities/venue/dto/update-venue.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateVenueDto = void 0;
class UpdateVenueDto {
}
exports.UpdateVenueDto = UpdateVenueDto;


/***/ }),

/***/ "./src/app/entities/venue/venue.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VenueController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const create_venue_dto_1 = __webpack_require__("./src/app/entities/venue/dto/create-venue.dto.ts");
const update_venue_dto_1 = __webpack_require__("./src/app/entities/venue/dto/update-venue.dto.ts");
const venue_service_1 = __webpack_require__("./src/app/entities/venue/venue.service.ts");
const mongoose_1 = __webpack_require__("mongoose");
let VenueController = class VenueController {
    constructor(venueService) {
        this.venueService = venueService;
    }
    getVenue(venueId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // console.log('getVenue aangeroepen');
            // console.log(venueId);
            return yield this.venueService.getVenueById(venueId);
        });
    }
    getVenues() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.venueService.getAllVenues();
        });
    }
    createVenue(createVenueDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.venueService.createVenue(createVenueDto.venueName, createVenueDto.venueImage, createVenueDto.adres, createVenueDto.city, createVenueDto.capacity);
        });
    }
    updateVenue(venueId, updateVenueDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.venueService.updateVenue(venueId, updateVenueDto);
        });
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(':venueId'),
    tslib_1.__param(0, (0, common_1.Param)('venueId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], VenueController.prototype, "getVenue", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], VenueController.prototype, "getVenues", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof create_venue_dto_1.CreateVenueDto !== "undefined" && create_venue_dto_1.CreateVenueDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], VenueController.prototype, "createVenue", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':venueId'),
    tslib_1.__param(0, (0, common_1.Param)('venueId')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof mongoose_1.Types !== "undefined" && mongoose_1.Types.ObjectId) === "function" ? _f : Object, typeof (_g = typeof update_venue_dto_1.UpdateVenueDto !== "undefined" && update_venue_dto_1.UpdateVenueDto) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], VenueController.prototype, "updateVenue", null);
VenueController = tslib_1.__decorate([
    (0, common_1.Controller)('venues'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof venue_service_1.VenueService !== "undefined" && venue_service_1.VenueService) === "function" ? _a : Object])
], VenueController);
exports.VenueController = VenueController;


/***/ }),

/***/ "./src/app/entities/venue/venue.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VenueModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const venue_controller_1 = __webpack_require__("./src/app/entities/venue/venue.controller.ts");
const venue_repository_1 = __webpack_require__("./src/app/entities/venue/venue.repository.ts");
const venue_schema_1 = __webpack_require__("./src/app/entities/venue/venue.schema.ts");
const venue_service_1 = __webpack_require__("./src/app/entities/venue/venue.service.ts");
let VenueModule = class VenueModule {
};
VenueModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: venue_schema_1.Venue.name, schema: venue_schema_1.VenueSchema }])],
        controllers: [venue_controller_1.VenueController],
        providers: [venue_service_1.VenueService, venue_repository_1.VenueRepository]
    })
], VenueModule);
exports.VenueModule = VenueModule;


/***/ }),

/***/ "./src/app/entities/venue/venue.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VenueRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
const venue_schema_1 = __webpack_require__("./src/app/entities/venue/venue.schema.ts");
const mongoose_3 = __webpack_require__("mongoose");
let VenueRepository = class VenueRepository {
    constructor(venueModel) {
        this.venueModel = venueModel;
    }
    findById(venueId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // console.log('repository findById aangeroepen')
            return yield this.venueModel.findOne({ _id: new mongoose_3.Types.ObjectId(venueId) });
        });
    }
    find(venueFilterQuery) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.venueModel.find(venueFilterQuery);
        });
    }
    create(venue) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newVenue = new this.venueModel(venue);
            return yield newVenue.save();
        });
    }
    findOneAndUpdate(venueFilterQuery, venue) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.venueModel.findOneAndUpdate(venueFilterQuery, venue, { new: true });
        });
    }
};
VenueRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(venue_schema_1.Venue.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], VenueRepository);
exports.VenueRepository = VenueRepository;


/***/ }),

/***/ "./src/app/entities/venue/venue.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VenueSchema = exports.Venue = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
let Venue = class Venue {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Venue.prototype, "venueName", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Venue.prototype, "venueImage", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Venue.prototype, "adres", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Venue.prototype, "city", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Number !== "undefined" && Number) === "function" ? _a : Object)
], Venue.prototype, "capacity", void 0);
Venue = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Venue);
exports.Venue = Venue;
exports.VenueSchema = mongoose_1.SchemaFactory.createForClass(Venue);


/***/ }),

/***/ "./src/app/entities/venue/venue.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VenueService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const venue_repository_1 = __webpack_require__("./src/app/entities/venue/venue.repository.ts");
let VenueService = class VenueService {
    constructor(venueRepository) {
        this.venueRepository = venueRepository;
    }
    getVenueById(venueId) {
        // console.log('service getById aangeroepen');
        return this.venueRepository.findById(venueId);
    }
    getAllVenues() {
        return this.venueRepository.find({});
    }
    createVenue(venueName, venueImage, adres, city, capacity) {
        return this.venueRepository.create({
            venueName,
            venueImage,
            adres,
            city,
            capacity
        });
    }
    updateVenue(venueId, venueUpdates) {
        return this.venueRepository.findOneAndUpdate({ _id: venueId }, venueUpdates);
    }
};
VenueService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof venue_repository_1.VenueRepository !== "undefined" && venue_repository_1.VenueRepository) === "function" ? _a : Object])
], VenueService);
exports.VenueService = VenueService;


/***/ }),

/***/ "@nestjs/common":
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/jwt":
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/mongoose":
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),

/***/ "@nestjs/passport":
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "mongoose":
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "neo4j-driver":
/***/ ((module) => {

module.exports = require("neo4j-driver");

/***/ }),

/***/ "passport-jwt":
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),

/***/ "passport-local":
/***/ ((module) => {

module.exports = require("passport-local");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const app_module_1 = __webpack_require__("./src/app/app.module.ts");
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        const globalPrefix = 'api';
        app.setGlobalPrefix(globalPrefix);
        const port = process.env.PORT || 3333;
        app.enableCors();
        yield app.listen(port);
        common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
    });
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map