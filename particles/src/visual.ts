"use strict";

import powerbi from "powerbi-visuals-api";
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import "./../style/visual.less";

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;

import { tsParticles } from "@tsparticles/engine";
import { loadBasic } from "@tsparticles/basic";

import { fireworks } from "@tsparticles/fireworks"

import { VisualFormattingSettingsModel } from "./settings";

export class Visual implements IVisual {
  private visualUpdateOptions: VisualConstructorOptions;

  private formattingSettings: VisualFormattingSettingsModel;
  private formattingSettingsService: FormattingSettingsService;

  private particleCanvas: HTMLCanvasElement;

  constructor(options: VisualConstructorOptions) {
    this.formattingSettingsService = new FormattingSettingsService();

    if (document) {
      this.particleCanvas = document.createElement("canvas");
      this.particleCanvas.id = "tsparticles";
      this.particleCanvas.setAttribute("width", "100%");
      this.particleCanvas.setAttribute("height", "100%");

      options.element.append(this.particleCanvas)

      fireworks
      .create(this.particleCanvas,
        {
          sounds:false
        }
      )

      console.log(this.particleCanvas)

      
    }
  }

  public update(options: VisualUpdateOptions) {
    this.formattingSettings =
      this.formattingSettingsService.populateFormattingSettingsModel(
        VisualFormattingSettingsModel,
        options.dataViews[0],
      );
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
