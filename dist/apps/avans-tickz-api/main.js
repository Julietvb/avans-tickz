/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/avans-tickz-api/src/app/app.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const app_service_1 = __webpack_require__("./apps/avans-tickz-api/src/app/app.service.ts");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getData() {
        return this.appService.getData();
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "getData", null);
AppController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);
exports.AppController = AppController;


/***/ }),

/***/ "./apps/avans-tickz-api/src/app/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const app_controller_1 = __webpack_require__("./apps/avans-tickz-api/src/app/app.controller.ts");
const app_service_1 = __webpack_require__("./apps/avans-tickz-api/src/app/app.service.ts");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const user_module_1 = __webpack_require__("./apps/avans-tickz-api/src/app/entities/user/user.module.ts");
const concert_module_1 = __webpack_require__("./apps/avans-tickz-api/src/app/entities/concert/concert.module.ts");
const venue_module_1 = __webpack_require__("./apps/avans-tickz-api/src/app/entities/venue/venue.module.ts");
const artist_module_1 = __webpack_require__("./apps/avans-tickz-api/src/app/entities/artist/artist.module.ts");
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forRoot('mongodb://127.0.0.1:27017/avansTickz'), user_module_1.UserModule, concert_module_1.ConcertModule, venue_module_1.VenueModule, artist_module_1.ArtistModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./apps/avans-tickz-api/src/app/app.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
let AppService = class AppService {
    getData() {
        return { message: 'Welcome to avans-tickz-api!' };
    }
};
AppService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;


/***/ }),

/***/ "./apps/avans-tickz-api/src/app/entities/artist/artist.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ArtistController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const create_artist_dto_1 = __webpack_require__("./apps/avans-tickz-api/src/app/entities/artist/dto/create-artist.dto.ts");
const update_artist_dto_1 = __webpack_require__("./apps/avans-tickz-api/src/app/entities/artist/dto/update-artist.dto.ts");
const artist_service_1 = __webpack_require__("./apps/avans-tickz-api/src/app/entities/artist/artist.service.ts");
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
            console.log('deleteArtist aangeroepen');
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

/***/ "./apps/avans-tickz-api/src/app/entities/artist/artist.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ArtistModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const artist_controller_1 = __webpack_require__("./apps/avans-tickz-api/src/app/entities/artist/artist.controller.ts");
const artist_repository_1 = __webpack_require__("./apps/avans-tickz-api/src/app/entities/artist/artist.repository.ts");
const artist_schema_1 = __webpack_require__("./apps/avans-tickz-api/src/app/entities/artist/artist.schema.ts");
const artist_service_1 = __webpack_require__("./apps/avans-tickz-api/src/app/entities/artist/artist.service.ts");
let ArtistModule = class ArtistModule {
};
ArtistModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: artist_schema_1.Artist.name, schema: artist_schema_1.ArtistSchema }])],
        controllers: [artist_controller_1.ArtistController],
        providers: [artist_service_1.ArtistService, artist_repository_1.ArtistRepository],
        exports: [artist_repository_1.ArtistRepository]
    })
], ArtistModule);
exports.ArtistModule = ArtistModule;


/***/ }),

/***/ "./apps/avans-tickz-api/src/app/entities/artist/artist.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ArtistRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
const artist_schema_1 = __webpack_require__("./apps/avans-tickz-api/src/app/entities/artist/artist.schema.ts");
const mongoose_3 = __webpack_require__("mongoose");
let ArtistRepository = class ArtistRepository {
    constructor(artistModel) {
        this.artistModel = artistModel;
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
            const newArtist = new this.artistModel(artist);
            return yield newArtist.save();
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
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], ArtistRepository);
exports.ArtistRepository = ArtistRepository;


/***/ }),

/***/ "./apps/avans-tickz-api/src/app/entities/artist/artist.schema.ts":
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
], Artist.prototype, "artistHeader", void 0);
Artist = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Artist);
exports.Artist = Artist;
exports.ArtistSchema = mongoose_1.SchemaFactory.createForClass(Artist);


/***/ }),

/***/ "./apps/avans-tickz-api/src/app/entities/artist/artist.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ArtistService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const artist_repository_1 = __webpack_require__("./apps/avans-tickz-api/src/app/entities/artist/artist.repository.ts");
let ArtistService = class ArtistService {
    constructor(artistRepository) {
        this.artistRepository = artistRepository;
    }
    getArtistById(artistId) {
        console.log('service getById aangeroepen');
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

/***/ "./apps/avans-tickz-api/src/app/entities/artist/dto/create-artist.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateArtistDto = void 0;
class CreateArtistDto {
}
exports.CreateArtistDto = CreateArtistDto;


/***/ }),

/***/ "./apps/avans-tickz-api/src/app/entities/artist/dto/update-artist.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateArtistDto = void 0;
class UpdateArtistDto {
}
exports.UpdateArtistDto = UpdateArtistDto;


/***/ }),

/***/ "./apps/avans-tickz-api/src/app/entities/concert/concert.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConcertController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const create_concert_dto_1 = __webpack_require__("./apps/avans-tickz-api/src/app/entities/concert/dto/create-concert.dto.ts");
const update_concert_dto_1 = __webpack_require__("./apps/avans-tickz-api/src/app/entities/concert/dto/update-concert.dto.ts");
const concert_service_1 = __webpack_require__("./apps/avans-tickz-api/src/app/entities/concert/concert.service.ts");
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
    getConcerts() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.concertService.getAllConcerts();
        });
    }
    createConcert(createConcertDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log("controller aangeroepen");
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
            console.log('deleteConcert aangeroepen');
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
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ConcertController.prototype, "getConcerts", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof create_concert_dto_1.CreateConcertDto !== "undefined" && create_concert_dto_1.CreateConcertDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], ConcertController.prototype, "createConcert", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':concertId'),
    tslib_1.__param(0, (0, common_1.Param)('concertId')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof mongoose_1.Types !== "undefined" && mongoose_1.Types.ObjectId) === "function" ? _f : Object, typeof (_g = typeof update_concert_dto_1.UpdateConcertDto !== "undefined" && update_concert_dto_1.UpdateConcertDto) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
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

/***/ "./apps/avans-tickz-api/src/app/entities/concert/concert.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConcertModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const concert_controller_1 = __webpack_require__("./apps/avans-tickz-api/src/app/entities/concert/concert.controller.ts");
const concert_repository_1 = __webpack_require__("./apps/avans-tickz-api/src/app/entities/concert/concert.repository.ts");
const concert_schema_1 = __webpack_require__("./apps/avans-tickz-api/src/app/entities/concert/concert.schema.ts");
const concert_service_1 = __webpack_require__("./apps/avans-tickz-api/src/app/entities/concert/concert.service.ts");
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

/***/ "./apps/avans-tickz-api/src/app/entities/concert/concert.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConcertRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
const concert_schema_1 = __webpack_require__("./apps/avans-tickz-api/src/app/entities/concert/concert.schema.ts");
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

/***/ "./apps/avans-tickz-api/src/app/entities/concert/concert.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConcertSchema = exports.Concert = void 0;
const tslib_1 = __webpack_require__("tslib");
const venue_schema_1 = __webpack_require__("./apps/avans-tickz-api/src/app/entities/venue/venue.schema.ts");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
const artist_schema_1 = __webpack_require__("./apps/avans-tickz-api/src/app/entities/artist/artist.schema.ts");
const ticket_schema_1 = __webpack_require__("./apps/avans-tickz-api/src/app/entities/ticket/ticket.schema.ts");
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
    tslib_1.__metadata("design:type", typeof (_b = typeof Number !== "undefined" && Number) === "function" ? _b : Object)
], Concert.prototype, "amountOfTickets", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Artist' }),
    tslib_1.__metadata("design:type", typeof (_c = typeof artist_schema_1.Artist !== "undefined" && artist_schema_1.Artist) === "function" ? _c : Object)
], Concert.prototype, "artist", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)([ticket_schema_1.Ticket]),
    tslib_1.__metadata("design:type", Array)
], Concert.prototype, "tickets", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Venue' }),
    tslib_1.__metadata("design:type", typeof (_d = typeof venue_schema_1.Venue !== "undefined" && venue_schema_1.Venue) === "function" ? _d : Object)
], Concert.prototype, "venue", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_e = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _e : Object)
], Concert.prototype, "creatorId", void 0);
Concert = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Concert);
exports.Concert = Concert;
exports.ConcertSchema = mongoose_1.SchemaFactory.createForClass(Concert);


/***/ }),

/***/ "./apps/avans-tickz-api/src/app/entities/concert/concert.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConcertService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const concert_repository_1 = __webpack_require__("./apps/avans-tickz-api/src/app/entities/concert/concert.repository.ts");
const mongoose_1 = __webpack_require__("mongoose");
let ConcertService = class ConcertService {
    constructor(concertRepository) {
        this.concertRepository = concertRepository;
    }
    getConcertById(concertId) {
        return this.concertRepository.findById(concertId);
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

/***/ "./apps/avans-tickz-api/src/app/entities/concert/dto/create-concert.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateConcertDto = void 0;
class CreateConcertDto {
}
exports.CreateConcertDto = CreateConcertDto;


/***/ }),

/***/ "./apps/avans-tickz-api/src/app/entities/concert/dto/update-concert.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateConcertDto = void 0;
class UpdateConcertDto {
}
exports.UpdateConcertDto = UpdateConcertDto;


/***/ }),

/***/ "./apps/avans-tickz-api/src/app/entities/ticket/ticket.schema.ts":
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

/***/ "./apps/avans-tickz-api/src/app/entities/user/dto/create-user.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateUserDto = void 0;
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;


/***/ }),

/***/ "./apps/avans-tickz-api/src/app/entities/user/dto/update-user.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUserDto = void 0;
class UpdateUserDto {
}
exports.UpdateUserDto = UpdateUserDto;


/***/ }),

/***/ "./apps/avans-tickz-api/src/app/entities/user/user.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const create_user_dto_1 = __webpack_require__("./apps/avans-tickz-api/src/app/entities/user/dto/create-user.dto.ts");
const update_user_dto_1 = __webpack_require__("./apps/avans-tickz-api/src/app/entities/user/dto/update-user.dto.ts");
const user_service_1 = __webpack_require__("./apps/avans-tickz-api/src/app/entities/user/user.service.ts");
const mongoose_1 = __webpack_require__("mongoose");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getUser(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('getUser aangeroepen');
            console.log(userId);
            return yield this.userService.getUserById(userId);
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
            return this.userService.updateUser(userId, updateUserDto);
        });
    }
    deleteUser(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('deleteUser aangeroepen');
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
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], UserController.prototype, "getUsers", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof create_user_dto_1.CreateUserDto !== "undefined" && create_user_dto_1.CreateUserDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], UserController.prototype, "createUser", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':userId'),
    tslib_1.__param(0, (0, common_1.Param)('userId')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof mongoose_1.Types !== "undefined" && mongoose_1.Types.ObjectId) === "function" ? _f : Object, typeof (_g = typeof update_user_dto_1.UpdateUserDto !== "undefined" && update_user_dto_1.UpdateUserDto) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], UserController.prototype, "updateUser", null);
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

/***/ "./apps/avans-tickz-api/src/app/entities/user/user.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const user_controller_1 = __webpack_require__("./apps/avans-tickz-api/src/app/entities/user/user.controller.ts");
const user_repository_1 = __webpack_require__("./apps/avans-tickz-api/src/app/entities/user/user.repository.ts");
const user_schema_1 = __webpack_require__("./apps/avans-tickz-api/src/app/entities/user/user.schema.ts");
const user_service_1 = __webpack_require__("./apps/avans-tickz-api/src/app/entities/user/user.service.ts");
let UserModule = class UserModule {
};
UserModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }])],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, user_repository_1.UserRepository]
    })
], UserModule);
exports.UserModule = UserModule;


/***/ }),

/***/ "./apps/avans-tickz-api/src/app/entities/user/user.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
const user_schema_1 = __webpack_require__("./apps/avans-tickz-api/src/app/entities/user/user.schema.ts");
const mongoose_3 = __webpack_require__("mongoose");
let UserRepository = class UserRepository {
    constructor(userModel) {
        this.userModel = userModel;
    }
    findById(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('repository findById aangeroepen');
            return yield this.userModel.findOne({ _id: new mongoose_3.Types.ObjectId(userId) });
        });
    }
    find(usersFilterQuery) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.find(usersFilterQuery);
        });
    }
    create(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newUser = new this.userModel(user);
            return yield newUser.save();
        });
    }
    findOneAndUpdate(userFilterQuery, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.findOneAndUpdate(userFilterQuery, user, { new: true });
        });
    }
    deleteById(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.deleteOne({ _id: new mongoose_3.Types.ObjectId(userId) });
        });
    }
};
UserRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], UserRepository);
exports.UserRepository = UserRepository;


/***/ }),

/***/ "./apps/avans-tickz-api/src/app/entities/user/user.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserSchema = exports.User = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const ticket_schema_1 = __webpack_require__("./apps/avans-tickz-api/src/app/entities/ticket/ticket.schema.ts");
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
    (0, mongoose_1.Prop)([String]),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "favoriteArtists", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)([ticket_schema_1.Ticket]),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "myTickets", void 0);
User = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);


/***/ }),

/***/ "./apps/avans-tickz-api/src/app/entities/user/user.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const user_repository_1 = __webpack_require__("./apps/avans-tickz-api/src/app/entities/user/user.repository.ts");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    getUserById(userId) {
        console.log('service getById aangeroepen');
        return this.userRepository.findById(userId);
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
            myTickets: []
        });
    }
    updateUser(userId, userUpdates) {
        return this.userRepository.findOneAndUpdate({ _id: userId }, userUpdates);
    }
    deleteUserById(userId) {
        return this.userRepository.deleteById(userId);
    }
};
UserService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof user_repository_1.UserRepository !== "undefined" && user_repository_1.UserRepository) === "function" ? _a : Object])
], UserService);
exports.UserService = UserService;


/***/ }),

/***/ "./apps/avans-tickz-api/src/app/entities/venue/dto/create-venue.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateVenueDto = void 0;
class CreateVenueDto {
}
exports.CreateVenueDto = CreateVenueDto;


/***/ }),

/***/ "./apps/avans-tickz-api/src/app/entities/venue/dto/update-venue.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateVenueDto = void 0;
class UpdateVenueDto {
}
exports.UpdateVenueDto = UpdateVenueDto;


/***/ }),

/***/ "./apps/avans-tickz-api/src/app/entities/venue/venue.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VenueController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const create_venue_dto_1 = __webpack_require__("./apps/avans-tickz-api/src/app/entities/venue/dto/create-venue.dto.ts");
const update_venue_dto_1 = __webpack_require__("./apps/avans-tickz-api/src/app/entities/venue/dto/update-venue.dto.ts");
const venue_service_1 = __webpack_require__("./apps/avans-tickz-api/src/app/entities/venue/venue.service.ts");
const mongoose_1 = __webpack_require__("mongoose");
let VenueController = class VenueController {
    constructor(venueService) {
        this.venueService = venueService;
    }
    getVenue(venueId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('getVenue aangeroepen');
            console.log(venueId);
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

/***/ "./apps/avans-tickz-api/src/app/entities/venue/venue.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VenueModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const venue_controller_1 = __webpack_require__("./apps/avans-tickz-api/src/app/entities/venue/venue.controller.ts");
const venue_repository_1 = __webpack_require__("./apps/avans-tickz-api/src/app/entities/venue/venue.repository.ts");
const venue_schema_1 = __webpack_require__("./apps/avans-tickz-api/src/app/entities/venue/venue.schema.ts");
const venue_service_1 = __webpack_require__("./apps/avans-tickz-api/src/app/entities/venue/venue.service.ts");
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

/***/ "./apps/avans-tickz-api/src/app/entities/venue/venue.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VenueRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
const venue_schema_1 = __webpack_require__("./apps/avans-tickz-api/src/app/entities/venue/venue.schema.ts");
const mongoose_3 = __webpack_require__("mongoose");
let VenueRepository = class VenueRepository {
    constructor(venueModel) {
        this.venueModel = venueModel;
    }
    findById(venueId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('repository findById aangeroepen');
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

/***/ "./apps/avans-tickz-api/src/app/entities/venue/venue.schema.ts":
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

/***/ "./apps/avans-tickz-api/src/app/entities/venue/venue.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VenueService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const venue_repository_1 = __webpack_require__("./apps/avans-tickz-api/src/app/entities/venue/venue.repository.ts");
let VenueService = class VenueService {
    constructor(venueRepository) {
        this.venueRepository = venueRepository;
    }
    getVenueById(venueId) {
        console.log('service getById aangeroepen');
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

/***/ "@nestjs/mongoose":
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),

/***/ "mongoose":
/***/ ((module) => {

module.exports = require("mongoose");

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
const app_module_1 = __webpack_require__("./apps/avans-tickz-api/src/app/app.module.ts");
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