import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";

import { SectionComponent } from "@bitwarden/components";
import {
  PasswordGeneratorComponent,
  UsernameGeneratorComponent,
} from "@bitwarden/generator-components";
import { GeneratedCredential } from "@bitwarden/generator-core";

/**
 * Renders a password or username generator UI and emits the most recently generated value.
 * Used by the cipher form to be shown in a dialog/modal when generating cipher passwords/usernames.
 */
@Component({
  selector: "vault-cipher-form-generator",
  templateUrl: "./cipher-form-generator.component.html",
  standalone: true,
  imports: [CommonModule, SectionComponent, PasswordGeneratorComponent, UsernameGeneratorComponent],
})
export class CipherFormGeneratorComponent {
  /**
   * The type of generator form to show.
   */
  @Input({ required: true })
  type: "password" | "username";

  /**
   * Emits an event when a new value is generated.
   */
  @Output()
  valueGenerated = new EventEmitter<string>();

  /** Event handler for both generation components */
  onCredentialGenerated = (generatedCred: GeneratedCredential) => {
    this.valueGenerated.emit(generatedCred.credential);
  };
}
