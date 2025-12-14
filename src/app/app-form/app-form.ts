import { Component, signal, resource } from '@angular/core';
import { TestNgForm } from './test-ng-form';
import { form, required, minLength, debounce, min, Field, validateAsync, customError, pattern } from '@angular/forms/signals';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-app-form',
  imports: [
    Field,
    CommonModule
  ],
  templateUrl: './app-form.html',
  styleUrl: './app-form.css',
})
export class AppForm {
  submitted = signal(false);
  protected model = signal<TestNgForm>({
    name: '',
    email: '',
    age: 0,
  });
  result: any = '';


  protected form = form(this.model, m => {
    required(m.name, {
      message: 'imię jest wymagane',
    });
    minLength(m.name, 3, {
      message: 'imię musi mieć conajmniej 3 znaki',
    });
    required(m.email, {
      message: 'email jest wymagany',
    });

    min(m.age, 10, {
      message: 'musisz mieć conajmniej 10 lat',
    });

    pattern(m.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
      message: 'nieprawidłowy format email',
    });

    debounce(m.name, 500);

		validateAsync(m.name, {
			params: ({ value }) => {
					const val = value();
					if (!val || val.length < 3) return undefined;
					return val;
			},
			factory: name =>
					resource({
							params: name,
							loader: async ({ params: name }) => {
									const available = await this.checkUsernameAvailability(name);
									return available;
							}
					}),
			onSuccess: (result: boolean) => {
				if (!result) {
						return customError({
								kind: 'username_taken',
								message: 'This username is already taken',
						});
				}
				return null;
			},
			onError: (error: unknown) => {
					console.error('Validation error:', error);
					return null;
			}
		});
    
  });

  protected async onSubmit(event:any) {
    !!event && event.preventDefault();
    this.submitted.set(true);

    if (this.form().valid()) {
        this.result = this.model();
    } else {
        this.result = 'Formularz jest nieprawidłowy!';
    }
  }

  private checkUsernameAvailability(username: string): Promise<boolean> {
    return new Promise(resolve => {
        setTimeout(() => {
            const taken = ['admin', 'test', 'tomek'];
            resolve(!taken.includes(username.toLowerCase()));
        }, 2500);
    });
	}

}
