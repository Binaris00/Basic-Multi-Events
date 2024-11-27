import { Editor, MarkdownView, Notice, Plugin } from 'obsidian';
import { DEFAULT_SETTINGS, IMultiEventSettings, MultiEventSettingTab } from './settings/settings_main';
import { SampleModal } from './components/base_modals';

export default class MultiBasicEvents extends Plugin {
	settings: IMultiEventSettings;

	DARK_MODE_THEME_KEY: string = "obsidian";
	LIGHT_MODE_THEME_KEY: string = "moonstone";

	currentColorStatus: string;

	async onload() {
		await this.loadSettings();

		this.initColorStatus();

		const themePickerStatusBarItem: HTMLElement = this.addStatusBarItem();

		const changeThemeButton: HTMLElement = themePickerStatusBarItem.createDiv({
			cls: "status-bar-item mod-clickable",
			text: this.currentColorStatus
		});

		changeThemeButton.addEventListener("click", () => {
			this.toggleColorScheme();
		});

		this.registerEvent(
			this.app.workspace.on("css-change", () => {
				this.initColorStatus();
				changeThemeButton.textContent = this.currentColorStatus;
			})
		);

		this.addSettingTab(new MultiEventSettingTab(this.app, this));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}



	isDarkMode(): boolean {
		//@ts-ignore
		return this.app.vault.getConfig("theme") === this.DARK_MODE_THEME_KEY;
	}

	toggleColorScheme(): void {
		let colorSchemeKey;

		if (this.isDarkMode()) {
			colorSchemeKey = this.LIGHT_MODE_THEME_KEY;
			this.currentColorStatus = this.settings.lightModeStringStatus;
		} else {
			colorSchemeKey = this.DARK_MODE_THEME_KEY;
			this.currentColorStatus = this.settings.darkModeStringStatus;
		}

		//@ts-ignore
		this.app.changeTheme(colorSchemeKey);
	}

	initColorStatus(): void {
		if(this.isDarkMode()){
			this.currentColorStatus = this.settings.lightModeStringStatus;
		} else {
			this.currentColorStatus = this.settings.darkModeStringStatus;
		}
	}
}