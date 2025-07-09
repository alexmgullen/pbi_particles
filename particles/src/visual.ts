"use strict";

import powerbi from "powerbi-visuals-api";
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import "./../style/visual.less";

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;

import { tsParticles } from "@tsparticles/engine";

import { VisualFormattingSettingsModel } from "./settings";

export class Visual implements IVisual {
  private visualUpdateOptions: VisualConstructorOptions;

  private formattingSettings: VisualFormattingSettingsModel;
  private formattingSettingsService: FormattingSettingsService;

  private particleCanvas: HTMLDivElement;

  constructor(options: VisualConstructorOptions) {
    this.formattingSettingsService = new FormattingSettingsService();

    if (document) {
      this.particleCanvas = document.createElement("div");
      this.particleCanvas.id = "tsparticles";
      this.particleCanvas.setAttribute("width", "100%");
      this.particleCanvas.setAttribute("height", "100%");

      options.element.append(this.particleCanvas);

      console.log("target: ", options.element);

      tsParticles
        .load({
          id: "tsparticles",
          url: "https://grognard.ca/assets/data/FabricCommunityContests/particles.json",
        })
        .then((container) => {
          console.log(container);
        })
        .catch((error) => {
          console.error(error);
        });

      const particles = tsParticles.domItem(0);

      particles.play();
    }
  }

  public update(options: VisualUpdateOptions) {
    this.formattingSettings =
      this.formattingSettingsService.populateFormattingSettingsModel(
        VisualFormattingSettingsModel,
        options.dataViews[0],
      );

    console.log(this.particleCanvas);
  }

  /**
   * Returns properties pane formatting model content hierarchies, properties and latest formatting values, Then populate properties pane.
   * This method is called once every time we open properties pane or when the user edit any format property.
   */
  public getFormattingModel(): powerbi.visuals.FormattingModel {
    return this.formattingSettingsService.buildFormattingModel(
      this.formattingSettings,
    );
  }
}
