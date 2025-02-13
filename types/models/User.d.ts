export = User;
declare class User {
    /**
     * @param {object} data
     * @param {boolean} parse
     * @param {EnkaClient} enka
     */
    constructor(data: object, parse: boolean, enka: EnkaClient);
    /** @type {EnkaClient} */
    enka: EnkaClient;
    /** @type {object} */
    _data: object;
    /** @type {number} */
    uid: number;
    /** @type {string} */
    nickname: string;
    /** @type {string | null} */
    signature: string | null;
    /** @type {CharacterData} */
    profilePictureCharacter: CharacterData;
    /** @type {{avatar: CharacterData, level: number, costume?: Costume}[]} */
    showAvatarInfoList: {
        avatar: CharacterData;
        level: number;
        costume?: Costume;
    }[];
    /** @type {NameCard[]} */
    showNameCardList: NameCard[];
    /** @type {number} */
    level: number;
    /** @type {number} */
    worldLevel: number;
    /** @type {NameCard} */
    nameCard: NameCard;
    /** @type {number} */
    finishAchievementNum: number;
    /** @type {number} */
    towerFloorIndex: number;
    /** @type {number} */
    towerLevelIndex: number;
    /** @type {Character[]} */
    avatarInfoList: Character[];
}
import EnkaClient = require("../client/EnkaClient");
import CharacterData = require("./character/CharacterData");
import Costume = require("./character/Costume");
import NameCard = require("./NameCard");
import Character = require("./character/Character");
