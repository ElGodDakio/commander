import { Player } from "@minecraft/server";

export interface BaseCommand {
    name: string;
    description: string;
    usage: string;
    aliases?: string[];

    execute(sender: Player, label: string, ...args: string[]);
}

export interface Command extends BaseCommand {
    subcommands?: BaseCommand[];
}