const EnkaClient = require("../client/EnkaClient");
const Character = require("./character/Character");
const CharacterData = require("./character/CharacterData");
const Costume = require("./character/Costume");
const NameCard = require("./NameCard");

module.exports = class User {
    /** 
     * @param {object} data
     * @param {boolean} parse
     * @param {EnkaClient} enka
     */
    constructor(data, parse, enka) {
        /** @type {EnkaClient} */
        this.enka = enka;

        /** @type {object} */
        this._data = data;

        if (!parse) return;
        if (!enka.cachedAssetsManager.hasAllContents()) throw new Error("Complete Genshin data cache not found.\nYou need to fetch Genshin data by EnkaClient#cachedAssetsManager#fetchAllContents at least once.");

        /** @type {number} */
        this.uid = Number(data.uid);

        /** @type {string} */
        this.nickname = data.playerInfo.nickname;

        /** @type {string | null} */
        this.signature = data.playerInfo.signature ?? null;

        /** @type {CharacterData} */
        this.profilePictureCharacter = new CharacterData(data.playerInfo.profilePicture.avatarId, enka);

        /** @type {{avatar: CharacterData, level: number, costume?: Costume}[]} */
        this.showAvatarInfoList = data.playerInfo.showAvatarInfoList ? data.playerInfo.showAvatarInfoList.map(obj => {
            let copyObj = {
                ...obj,
            }
            const character = new CharacterData(copyObj.avatarId, enka);
            copyObj['avatar'] = character
            delete copyObj["avatarId"];

            if (copyObj["costumeId"]) {
                const costume = new Costume(copyObj["costumeId"], enka);
                copyObj["costume"] = costume;
                delete copyObj["costumeId"];
            }

            return copyObj
        }) : [];

        /** @type {NameCard[]} */
        this.showNameCardList = data.playerInfo.showNameCardIdList ? data.playerInfo.showNameCardIdList.map(id => new NameCard(id, enka)) : [];

        /** @type {number} */
        this.level = data.playerInfo.level;

        /** @type {number} */
        this.worldLevel = data.playerInfo.worldLevel;

        /** @type {NameCard} */
        this.nameCard = new NameCard(data.playerInfo.nameCardId, enka);

        /** @type {number} */
        this.finishAchievementNum = data.playerInfo.finishAchievementNum;

        /** @type {number} */
        this.towerFloorIndex = data.playerInfo.towerFloorIndex;

        /** @type {number} */
        this.towerLevelIndex = data.playerInfo.towerLevelIndex;


        /** @type {Character[]} */
        this.avatarInfoList = data.avatarInfoList.map(a => new Character(a, enka));
    }
}