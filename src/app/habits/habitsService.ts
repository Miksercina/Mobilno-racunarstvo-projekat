import { Injectable } from '@angular/core';
import { HabitModel } from './habit.model';

@Injectable({
  providedIn: 'root',
})
export class HabitsService {
  habits: HabitModel[] = [
    {
      id: 'h1',
      difficulty: 4,
      name: 'Drinking water',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Humanitarian_aid_OCPA-2005-10-28-090517a.jpg/640px-Humanitarian_aid_OCPA-2005-10-28-090517a.jpg',
    },
    {
      id: 'h2',
      difficulty: 8,
      name: 'Regular gym going',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Joe_Abbenda_1962.png/640px-Joe_Abbenda_1962.png',
    },
    {
      id: 'h3',
      difficulty: 10,
      name: 'Stop smoking',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Cheroot_Smoking_%28edited%29.jpg/640px-Cheroot_Smoking_%28edited%29.jpg',
    },
    {
      id: 'h4',
      difficulty: 7,
      name: 'Healthy food',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/People_eating_at_table_in_restaurant.png/640px-People_eating_at_table_in_restaurant.png',
    },
    {
      id: 'h5',
      difficulty: 10,
      name: 'Internet addiciton',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Big_n8_at_Home_-_man_using_home_computer%2C_2001.jpg/640px-Big_n8_at_Home_-_man_using_home_computer%2C_2001.jpg',
    },
    {
      id: 'h6',
      difficulty: 3,
      name: 'Teeth hygine',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Bonnet_Macaque_DSC_1125.jpg/640px-Bonnet_Macaque_DSC_1125.jpg',
    },
  ];

  constructor() {}

  getHabit(id: string | null): HabitModel | undefined {
    if (!id) {
      return undefined;
    }
    return this.habits.find((h: HabitModel) => h.id === id);
    //Vracamo habit koji odgovara id-ju koji smo prosledili
  }
}
