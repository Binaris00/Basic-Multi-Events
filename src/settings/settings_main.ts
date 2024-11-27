import { PluginSettingTab, App, Setting } from "obsidian";
import MultiBasicEvents from "src/main";


export interface IMultiEventSettings {
	mySetting: string;

	darkModeStringStatus: string;
	lightModeStringStatus: string;
}


export class MultiEventSettingTab extends PluginSettingTab {
	plugin: MultiBasicEvents;

	constructor(app: App, plugin: MultiBasicEvents) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		
		containerEl.empty();

		containerEl.createEl("h1", { text: "Multi-Events" });
		containerEl.createEl("h2", { text: "Multi-Events" });
		containerEl.createEl("h3", { text: "Multi-Events" });
		containerEl.createEl("h4", { text: "Multi-Events" });
		containerEl.createEl("h5", { text: "Multi-Events" });
		containerEl.createEl("h6", { text: "Multi-Events" });
		
		this.containerEl.createEl("br");


		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));

		
		new Setting(containerEl)
			.setName('Dark Mode String Status')
			.setDesc('Set any text-emoji to display the dark status!')
			.addText(text => text
				.setPlaceholder('🌕')
				.setValue(this.plugin.settings.darkModeStringStatus)
				.onChange(async (value) => {
					this.plugin.settings.darkModeStringStatus = value;
					await this.plugin.saveSettings();
				}));
		

		new Setting(containerEl)
			.setName('Light Mode String Status')
			.setDesc('Set any text-emoji to display the light status!')
			.addText(text => text
				.setPlaceholder('🔆')
				.setValue(this.plugin.settings.lightModeStringStatus)
				.onChange(async (value) => {
					this.plugin.settings.lightModeStringStatus = value;
					await this.plugin.saveSettings();
				}));
	}
}

export const DEFAULT_SETTINGS: IMultiEventSettings = {
	mySetting: 'default',
	darkModeStringStatus: '🌕',
	lightModeStringStatus: '🔆',
};

