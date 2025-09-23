import { Injectable } from '@angular/core';
import { HabitModel } from './habit.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, switchMap, take, tap } from 'rxjs';

interface HabitData {
  name: string;
  difficulty: number;
}

@Injectable({
  providedIn: 'root',
})
export class HabitsService {
  private _habits = new BehaviorSubject<HabitModel[]>([]);

  oldHabits: HabitModel[] = [
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

  constructor(private http: HttpClient) {}

  get habits() {
    return this._habits.asObservable();
  }

  addHabit(name: string, difficulty: number) {
    let generatedId: string;

    return this.http
      .post<{ name: string }>(
        `https://habit-today-default-rtdb.europe-west1.firebasedatabase.app/habits.json`,
        { name, difficulty }
      )
      .pipe(
        switchMap((resData) => {
          generatedId = resData.name;
          return this.habits;
        }),
        take(1),
        tap((habits) => {
          this._habits.next(
            habits.concat({
              id: generatedId,
              name,
              difficulty,
              icon: this.getRandomIcon(),
            })
          );
        })
      );
  }

  getRandomIcon() {
    let icons: string[] = [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Bonnet_Macaque_DSC_1125.jpg/640px-Bonnet_Macaque_DSC_1125.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Big_n8_at_Home_-_man_using_home_computer%2C_2001.jpg/640px-Big_n8_at_Home_-_man_using_home_computer%2C_2001.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/People_eating_at_table_in_restaurant.png/640px-People_eating_at_table_in_restaurant.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Humanitarian_aid_OCPA-2005-10-28-090517a.jpg/640px-Humanitarian_aid_OCPA-2005-10-28-090517a.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Cheroot_Smoking_%28edited%29.jpg/640px-Cheroot_Smoking_%28edited%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Eduard_von_Gr%C3%BCtzner_Falstaff.jpg/640px-Eduard_von_Gr%C3%BCtzner_Falstaff.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Ambigram_tattoo_Stay_here_written_on_feet.jpg/640px-Ambigram_tattoo_Stay_here_written_on_feet.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Funny_Cide.jpg/640px-Funny_Cide.jpg',
    ];

    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    return randomIcon;
  }

  getHabits() {
    return this.http
      .get<{ [key: string]: HabitData }>(
        `https://habit-today-default-rtdb.europe-west1.firebasedatabase.app/habits.json`
      )
      .pipe(
        map((habitsData) => {
          const habits: HabitModel[] = [];

          for (const key in habitsData) {
            if (habitsData.hasOwnProperty(key)) {
              habits.push({
                id: key,
                name: habitsData[key].name,
                difficulty: habitsData[key].difficulty,
                icon: this.getRandomIcon(),
              });
            }
          }

          return habits;
        }),
        tap((habits) => {
          this._habits.next(habits);
        })
      );
  }

  getHabit(id: string | null): HabitModel | undefined {
    if (!id) {
      return undefined;
    }
    return this._habits.value.find((h: HabitModel) => h.id === id);
    //Vracamo habit koji odgovara id-ju koji smo prosledili
  }
}
