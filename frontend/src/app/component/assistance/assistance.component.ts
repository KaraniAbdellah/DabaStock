import { Component, signal, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-assistance',
  imports: [MatIconModule, FormsModule, CommonModule],
  templateUrl: './assistance.component.html',
  styleUrl: './assistance.component.css',
})
export class AssistanceComponent {
  constructor() {}
  http = inject(HttpClient);
  prompts: Array<any> = [];
  prompt_msg: string = '';
  
  prompts_response: Array<any> = [];
  reponse: string = '';

  user_name: string = "Abdellah"
  image_avatar = `https://robohash.org/${this.user_name}`;

  isDisabled: Boolean  = false;

  // Request Requirments
  token: string = environment.scretKeyAiModel;
  endpoint: string = 'https://models.github.ai/inference';
  model: string = 'openai/gpt-4.1';

  async get_reponse() {
    this.isDisabled = true;
    const response = await fetch(`${this.endpoint}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: "" },
          { role: "user", content: this.prompt_msg }
        ],
        temperature: 1,
        top_p: 1,
        model: this.model
      }),
    });
  
    const data = await response.json();
    this.prompts_response.push({
      id: Date.now,
      text: data.choices[0].message.content,
    });
    this.isDisabled = false;
  }

  get_prompt(event: Event) {
    event.preventDefault();
    // Send Request for get the prompt result
    this.get_reponse();
    this.prompts.push({
      id: Date.now(),
      text: this.prompt_msg,
    });
    console.log(this.prompts);
    this.prompt_msg = '';
  }
}
