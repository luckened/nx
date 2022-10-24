import type {
  ProjectConfiguration,
  TargetConfiguration,
  Tree,
} from '@nrwl/devkit';
import type { Logger, ProjectMigrationInfo } from '../../utilities';
import { Migrator } from '../migrator';

export abstract class BuilderMigrator extends Migrator {
  protected targets: Map<string, TargetConfiguration> = new Map();

  constructor(
    tree: Tree,
    public readonly builderName: string,
    project: ProjectMigrationInfo,
    projectConfig: ProjectConfiguration,
    logger: Logger
  ) {
    super(tree, projectConfig, logger);

    this.project = project;
    this.projectConfig = projectConfig;

    this.collectBuilderTargets();
  }

  protected collectBuilderTargets(): void {
    for (const [name, target] of Object.entries(
      this.projectConfig.targets ?? {}
    )) {
      if (target.executor === this.builderName) {
        this.targets.set(name, target);
      }
    }
  }
}
