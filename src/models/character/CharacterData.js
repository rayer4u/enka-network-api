const EnkaClient = require("../../client/EnkaClient");
const ImageAssets = require("../assets/ImageAssets");
const TextAssets = require("../assets/TextAssets");
const Element = require("../Element");
const Skill = require("./Skill");
const AssetsNotFoundError = require("../../errors/AssetsNotFoundError");
const Constellation = require("./Constellation");
const ElementalBurst = require("./ElementalBurst");
const Costume = require("./Costume");
const PassiveTalent = require("./PassiveTalent");

module.exports = class CharacterData {
    /** 
     * @param {number} id
     * @param {EnkaClient} enka
     * @param {number} [candSkillDepotIds]
     */
    constructor(id, enka, candSkillDepotId = undefined) {

        /** @type {number} */
        this.id = id;

        /** @type {EnkaClient} */
        this.enka = enka;


        /** @type {object} */
        this._data = require(enka.cachedAssetsManager.getJSONDataPath("AvatarExcelConfigData")).find(c => c.id === id);

        if (!this._data) throw new AssetsNotFoundError("Character", id);


        /** @type {TextAssets} */
        this.name = new TextAssets(this._data.nameTextMapHash, enka);

        /** @type {TextAssets} */
        this.description = new TextAssets(this._data.descTextMapHash, enka);

        /** @type {"BODY_MALE" | "BODY_BOY" | "BODY_LADY" | "BODY_GIRL" | "BODY_LOLI"} */
        this.bodyType = this._data.bodyType;

        /** @type {"MALE" | "FEMALE"} */
        this.gender = this.bodyType === "BODY_MALE" || this.bodyType === "BODY_BOY" ? "MALE" : "FEMALE";

        /** @type {string} */
        this._nameId = this._data.iconName.slice(this._data.iconName.lastIndexOf("_") + 1);

        /** @type {ImageAssets} */
        this.icon = new ImageAssets(this._data.iconName);

        /** @type {ImageAssets} */
        this.sideIcon = new ImageAssets(this._data.sideIconName);

        /** @type {ImageAssets} */
        this.gachaSplash = new ImageAssets(`UI_Gacha_AvatarImg_${this._nameId}`);

        /**
         * Travelers do not have this.
         *  @type {ImageAssets} 
         */
        this.gachaSlice = new ImageAssets(`UI_Gacha_AvatarIcon_${this._nameId}`);


        /** @type {"QUALITY_ORANGE" | "QUALITY_PURPLE" | "QUALITY_ORANGE_SP"} */
        this.qualityType = this._data.qualityType;

        /** @type {number} */
        this.stars = this.qualityType.startsWith("QUALITY_ORANGE") ? 5 : 4;

        /** @type {object[]} */
        this._costumeData = require(enka.cachedAssetsManager.getJSONDataPath("AvatarCostumeExcelConfigData")).filter(c => c.AKOANLMAFDD === id);

        /** @type {Costume[]} */
        this.costumes = this._costumeData.map(c => new Costume(c.OGKFGGNLLDG, enka));



        /** @type {number} */
        this.skillDepotId = candSkillDepotId ?? this._data.skillDepotId;

        /** @type {object} */
        this._skillData = require(enka.cachedAssetsManager.getJSONDataPath("AvatarSkillDepotExcelConfigData")).find(s => s.id === this.skillDepotId);

        if (!this._skillData) throw new AssetsNotFoundError("Skill Depot", this.skillDepotId);


        /** @type {Skill[]} */
        this.skills = this._skillData.skills.filter(id => id !== 0).map(id => new Skill(id, enka));

        // if the character is "Traveler" and no skillDepotId (which indicates its element type) provided,
        // `elementalBurst` cannot be retrieved.
        if (this._skillData.energySkill) {
            /** @type {ElementalBurst} */
            this.elementalBurst = new ElementalBurst(this._skillData.energySkill, enka);

            /** @type {Element} */
            this.element = this.elementalBurst.costElemType;
        }

        /** @type {PassiveTalent[]} */
        this.passiveTalents = this._skillData.inherentProudSkillOpens.filter(p => p.hasOwnProperty("proudSkillGroupId")).map(p => new PassiveTalent(p.proudSkillGroupId * 100 + 1, enka)); // Number(`${p.proudSkillGroupId}01`)


        /** @type {Constellation[]} */
        this.constellations = this._skillData.talents.filter(id => id !== 0).map(id => new Constellation(id, enka));


        /** @type {object | null} */
        this._releaseData = require(enka.cachedAssetsManager.getJSONDataPath("AvatarCodexExcelConfigData")).find(r => r.avatarId === id);

        if (this._releaseData) {
            /**
             * This is undefined if the character is not (being) released character, like Travelers and test avatars.
             * @type {Date} 
             */
            this.releasedAt = new Date(`${this._releaseData.beginTime}+8:00`);
        }

        /** 
         * Whether the character is playable.
         * @type {boolean} 
         */
        this.isPlayable = this._data.useType === "AVATAR_FORMAL";

    }
}