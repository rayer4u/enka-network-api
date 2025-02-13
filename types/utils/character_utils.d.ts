export function getCharactersById(id: number, enka: EnkaClient): CharacterData[];
export function hasEnergySkill(skillDepotId: number, enka: EnkaClient): boolean;
export function isReleased(avatarId: number, enka: EnkaClient): boolean;
import EnkaClient = require("../client/EnkaClient");
import CharacterData = require("../models/character/CharacterData");
