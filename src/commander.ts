import { Command } from "./types";

/**
 * Main class for managing commands
 * @class Commander
 */
export class Commander {
    private readonly prefix: string;

    private commands: Map<string, Command> = new Map<string, Command>()

    /**
     * @param prefix - The prefix to use for commands
     */
    public constructor(prefix: string) {
        this.prefix = prefix;
    }

    /**
     * Register a command
     * @param command - The command to register
     */
    public register(command: Command): void {
        this.commands.set(command.name, command);
        command.aliases?.forEach(alias => this.commands.set(alias, command));
    }

    public unregister(name: string): void {
        if (!this.registered(name)) {
            throw new Error(`Command "${name}" isn't registered`);
        }

        const command = this.get(name);

        this.commands.delete(name);
        command.aliases?.forEach(alias => this.commands.delete(alias));
    }

    public registered(name: string): boolean {
        return this.commands.get(name) !== undefined;
    }

    public get(name: string): Command {
        if (!this.registered(name)) {
            throw new Error(`Command "${name}" isn't registered`);
        }

        return this.commands.get(name)!;
    }

    /**
     * @todo Implement
     */
    public static init(): void {
    }
}

const commander = new Commander("!");