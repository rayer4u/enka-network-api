const EnkaClient = require("../../client/EnkaClient");
const CharacterStatusProperty = require("./CharacterStatusProperty");

const fightProps = {
    1: "FIGHT_PROP_BASE_HP",
    4: "FIGHT_PROP_BASE_ATTACK",
    7: "FIGHT_PROP_BASE_DEFENSE",
    20: "FIGHT_PROP_CRITICAL",
    22: "FIGHT_PROP_CRITICAL_HURT",
    23: "FIGHT_PROP_CHARGE_EFFICIENCY",
    26: "FIGHT_PROP_HEAL_ADD",
    27: "FIGHT_PROP_HEALED_ADD",
    28: "FIGHT_PROP_ELEMENT_MASTERY",
    29: "FIGHT_PROP_PHYSICAL_SUB_HURT",
    30: "FIGHT_PROP_PHYSICAL_ADD_HURT",
    40: "FIGHT_PROP_FIRE_ADD_HURT",
    41: "FIGHT_PROP_ELEC_ADD_HURT",
    42: "FIGHT_PROP_WATER_ADD_HURT",
    43: "FIGHT_PROP_GRASS_ADD_HURT",
    44: "FIGHT_PROP_WIND_ADD_HURT",
    45: "FIGHT_PROP_ROCK_ADD_HURT",
    46: "FIGHT_PROP_ICE_ADD_HURT",
    50: "FIGHT_PROP_FIRE_SUB_HURT",
    51: "FIGHT_PROP_ELEC_SUB_HURT",
    52: "FIGHT_PROP_WATER_SUB_HURT",
    53: "FIGHT_PROP_GRASS_SUB_HURT",
    54: "FIGHT_PROP_WIND_SUB_HURT",
    55: "FIGHT_PROP_ROCK_SUB_HURT",
    56: "FIGHT_PROP_ICE_SUB_HURT",
    70: "", // Pyro Enegry Cost
    71: "", // Electro Energy Cost
    72: "", // Hydro Energy Cost
    73: "", // Dendro Energy Cost
    74: "", // Anemo Energy Cost
    75: "", // Cryo Energy Cost
    76: "", // Geo Energy Cost
    1010: "FIGHT_PROP_CUR_HP",
    2000: "FIGHT_PROP_MAX_HP",
    2001: "FIGHT_PROP_ATTACK",
    2002: "FIGHT_PROP_DEFENSE"
}


module.exports = class CharacterStatus {
    /** 
     * @param {object} data
     * @param {EnkaClient} enka
     */
    constructor(data, enka) {
        /** @type {object} */
        this._data = data;

        /** @type {EnkaClient} */
        this.enka = enka;


        /** @type {CharacterStatusProperty} */
        this.baseHP = this.getStatusProperty(1);
        /** @type {CharacterStatusProperty} */
        this.baseAttack = this.getStatusProperty(4);
        /** @type {CharacterStatusProperty} */
        this.baseDefense = this.getStatusProperty(7);
        /** @type {CharacterStatusProperty} */
        this.critRate = this.getStatusProperty(20);
        /** @type {CharacterStatusProperty} */
        this.critDamage = this.getStatusProperty(22);
        /** @type {CharacterStatusProperty} */
        this.chargeEfficiency = this.getStatusProperty(23);
        /** @type {CharacterStatusProperty} */
        this.healAdd = this.getStatusProperty(26);
        /** @type {CharacterStatusProperty} */
        this.healedAdd = this.getStatusProperty(27);
        /** @type {CharacterStatusProperty} */
        this.elementMastery = this.getStatusProperty(28);
        /** @type {CharacterStatusProperty} */
        this.physicalRes = this.getStatusProperty(29);
        /** @type {CharacterStatusProperty} */
        this.physicalDamage = this.getStatusProperty(30);
        /** @type {CharacterStatusProperty} */
        this.pyroDamage = this.getStatusProperty(40);
        /** @type {CharacterStatusProperty} */
        this.electroDamage = this.getStatusProperty(41);
        /** @type {CharacterStatusProperty} */
        this.hydroDamage = this.getStatusProperty(42);
        /** @type {CharacterStatusProperty} */
        this.dendroDamage = this.getStatusProperty(43);
        /** @type {CharacterStatusProperty} */
        this.anemoDamage = this.getStatusProperty(44);
        /** @type {CharacterStatusProperty} */
        this.geoDamage = this.getStatusProperty(45);
        /** @type {CharacterStatusProperty} */
        this.cryoDamage = this.getStatusProperty(46);
        /** @type {CharacterStatusProperty} */
        this.pyroRes = this.getStatusProperty(50);
        /** @type {CharacterStatusProperty} */
        this.electroRes = this.getStatusProperty(51);
        /** @type {CharacterStatusProperty} */
        this.hydroRes = this.getStatusProperty(52);
        /** @type {CharacterStatusProperty} */
        this.dendroRes = this.getStatusProperty(53);
        /** @type {CharacterStatusProperty} */
        this.anemoRes = this.getStatusProperty(54);
        /** @type {CharacterStatusProperty} */
        this.geoRes = this.getStatusProperty(55);
        /** @type {CharacterStatusProperty} */
        this.cryoRes = this.getStatusProperty(56);

        /** @type {number} */
        this.pyroEnergyCost = data[70] ?? 0;
        /** @type {number} */
        this.electroEnergyCost = data[71] ?? 0;
        /** @type {number} */
        this.hydroEnergyCost = data[72] ?? 0;
        /** @type {number} */
        this.dendroEnergyCost = data[73] ?? 0;
        /** @type {number} */
        this.anemoEnergyCost = data[74] ?? 0;
        /** @type {number} */
        this.cryoEnergyCost = data[75] ?? 0;
        /** @type {number} */
        this.geoEnergyCost = data[76] ?? 0;

        /** @type {number} */
        this.energyCost = Math.max(
            this.pyroEnergyCost,
            this.electroEnergyCost,
            this.hydroEnergyCost,
            this.dendroEnergyCost,
            this.anemoEnergyCost,
            this.cryoEnergyCost,
            this.geoEnergyCost
        );

        /** @type {number} */
        this.currentPyroEnergy = data[1000] ?? 0;
        /** @type {number} */
        this.currentElectroEnergy = data[1001] ?? 0;
        /** @type {number} */
        this.currentHydroEnergy = data[1002] ?? 0;
        /** @type {number} */
        this.currentDendroEnergy = data[1003] ?? 0;
        /** @type {number} */
        this.currentAnemoEnergy = data[1004] ?? 0;
        /** @type {number} */
        this.currentCryoEnergy = data[1005] ?? 0;
        /** @type {number} */
        this.currentGeoEnergy = data[1006] ?? 0;

        /** @type {number} */
        this.currentEnergy = Math.max(
            this.currentPyroEnergy,
            this.currentElectroEnergy,
            this.currentHydroEnergy,
            this.currentDendroEnergy,
            this.currentAnemoEnergy,
            this.currentCryoEnergy,
            this.currentGeoEnergy
        );

        /** @type {CharacterStatusProperty} */
        this.currentHP = this.getStatusProperty(1010);

        /** @type {CharacterStatusProperty} */
        this.maxHP = this.getStatusProperty(2000);
        /** @type {CharacterStatusProperty} */
        this.attack = this.getStatusProperty(2001);
        /** @type {CharacterStatusProperty} */
        this.defense = this.getStatusProperty(2002);

        /** @type {CharacterStatusProperty[]} */
        this.statusProperties = Object.values(this).filter(value => value instanceof CharacterStatusProperty);
    }
    /**
     * @private
     * @param {number} id 
     * @returns {CharacterStatusProperty}
     */
    getStatusProperty(id) {
        return new CharacterStatusProperty(fightProps[id], this._data[id], this.enka);
    }
}