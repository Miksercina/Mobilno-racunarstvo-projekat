import { Injectable } from '@angular/core';
import { HabitModel } from './habit.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin, map, of, switchMap, take, tap } from 'rxjs';
import { Auth } from '../auth/auth';

interface HabitData {
  name: string;
  difficulty: number;
  icon: string;
  userId: string;
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
      userId: 'xx',
    },
    {
      id: 'h2',
      difficulty: 8,
      name: 'Regular gym going',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Joe_Abbenda_1962.png/640px-Joe_Abbenda_1962.png',
      userId: 'xx',
    },
    {
      id: 'h3',
      difficulty: 10,
      name: 'Stop smoking',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Cheroot_Smoking_%28edited%29.jpg/640px-Cheroot_Smoking_%28edited%29.jpg',
      userId: 'xx',
    },
    {
      id: 'h4',
      difficulty: 7,
      name: 'Healthy food',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/People_eating_at_table_in_restaurant.png/640px-People_eating_at_table_in_restaurant.png',
      userId: 'xx',
    },
    {
      id: 'h5',
      difficulty: 10,
      name: 'Internet addiciton',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Big_n8_at_Home_-_man_using_home_computer%2C_2001.jpg/640px-Big_n8_at_Home_-_man_using_home_computer%2C_2001.jpg',
      userId: 'xx',
    },
    {
      id: 'h6',
      difficulty: 3,
      name: 'Teeth hygine',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Bonnet_Macaque_DSC_1125.jpg/640px-Bonnet_Macaque_DSC_1125.jpg',
      userId: 'xx',
    },
  ];

  constructor(private http: HttpClient, private authService: Auth) {}

  get habits() {
    return this._habits.asObservable();
  }

  deleteHabit(id: string) {
    let fetchedToken: string;

    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        fetchedToken = token!;
        return this.http.delete(
          `https://habit-today-default-rtdb.europe-west1.firebasedatabase.app/habits/${id}.json?auth=${fetchedToken}`
        );
      }),
      switchMap(() => this.habits), // get current habits BehaviorSubject
      take(1),
      tap((habits) => {
        // remove the deleted habit locally
        this._habits.next(habits.filter((h) => h.id !== id));
      })
    );
  }

  addHabit(name: string, difficulty: number) {
    let generatedId: string;
    let newHabit: HabitModel;
    let fetchedUserId: string | null;

    return this.authService.userId.pipe(
      take(1),
      switchMap((userId) => {
        fetchedUserId = userId;
        return this.authService.token;
      }),
      take(1),
      switchMap((token) => {
        newHabit = new HabitModel(
          null!,
          difficulty,
          name,
          this.getRandomIcon(),
          fetchedUserId!
        );
        return this.http.post<{ name: string }>(
          `https://habit-today-default-rtdb.europe-west1.firebasedatabase.app/habits.json?auth=${token}`,
          newHabit
        );
      }),
      take(1),
      switchMap((resData) => {
        generatedId = resData.name;
        return this.habits;
      }),
      take(1),
      tap((habits) => {
        newHabit.id = generatedId;
        this._habits.next(habits.concat(newHabit));
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
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/June_odd-eyed-cat_cropped.jpg/640px-June_odd-eyed-cat_cropped.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Big_Dumb.jpg/640px-Big_Dumb.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Dumb_Patrol.jpg/640px-Dumb_Patrol.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Sexy_Zebras_en_Valladolid.jpg/640px-Sexy_Zebras_en_Valladolid.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Noncommutative_algebra_is_sexy_%284316393947%29.jpg/640px-Noncommutative_algebra_is_sexy_%284316393947%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Hip_replacement_Image_3684-PH.jpg/640px-Hip_replacement_Image_3684-PH.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Creative_picture_2.jpg/640px-Creative_picture_2.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Sadhu_and_a_picture_of_Siva.jpg/640px-Sadhu_and_a_picture_of_Siva.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Tradisi_Parebut_Seeng_Bogor.jpg/640px-Tradisi_Parebut_Seeng_Bogor.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Aerial_image_of_Grand_Prismatic_Spring_%28view_from_the_south%29.jpg/640px-Aerial_image_of_Grand_Prismatic_Spring_%28view_from_the_south%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Pluto-01_Stern_03_Pluto_Color_TXT.jpg/640px-Pluto-01_Stern_03_Pluto_Color_TXT.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/L%C3%A9gende_de_saint_Jacques-Le_miracle_de_la_r%C3%A9surrection_des_poulets_r%C3%B4tis_%28Mus%C3%A9e_Unterlinden%29_%28d%C3%A9tail%29_%281%29.jpg/640px-L%C3%A9gende_de_saint_Jacques-Le_miracle_de_la_r%C3%A9surrection_des_poulets_r%C3%B4tis_%28Mus%C3%A9e_Unterlinden%29_%28d%C3%A9tail%29_%281%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Marvel_tales_193912.jpg/640px-Marvel_tales_193912.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Bruxels_April_2012-11a.jpg/640px-Bruxels_April_2012-11a.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Marvel_science_stories_193902.jpg/640px-Marvel_science_stories_193902.jpg',
    ];

    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    return randomIcon;
  }

  getHabits() {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<{ [key: string]: HabitData }>(
          `https://habit-today-default-rtdb.europe-west1.firebasedatabase.app/habits.json?auth=${token}`
        );
      }),
      map((habitsData) => {
        const habits: HabitModel[] = [];

        for (const key in habitsData) {
          if (habitsData.hasOwnProperty(key)) {
            habits.push(
              new HabitModel(
                key,
                habitsData[key].difficulty,
                habitsData[key].name,
                habitsData[key].icon,
                habitsData[key].userId
              )
            );
          }
        }

        return habits;
      }),
      tap((habits) => {
        this._habits.next(habits);
      })
    );
  }

  getLeaderboard() {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        if (!token) {
          return of([]); // no token = not logged in
        }

        return forkJoin([
          this.http.get<{ [key: string]: HabitData }>(
            `https://habit-today-default-rtdb.europe-west1.firebasedatabase.app/habits.json?auth=${token}`
          ),
          this.http.get<{ [userId: string]: { name: string } }>(
            `https://habit-today-default-rtdb.europe-west1.firebasedatabase.app/users.json?auth=${token}`
          ),
        ]);
      }),
      map(([habitsData, users]) => {
        if (!habitsData) {
          return [];
        }

        const safeUsers = users || {};
        const counts: { [userId: string]: number } = {};

        // Count habits per user
        for (const key in habitsData) {
          if (habitsData.hasOwnProperty(key)) {
            const userId = habitsData[key].userId;
            if (userId) {
              counts[userId] = (counts[userId] || 0) + 1;
            }
          }
        }

        // Build leaderboard
        const leaderboard = Object.keys(counts)
          .map((userId) => ({
            name: safeUsers[userId]?.name || userId,
            count: counts[userId],
          }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 3);

        return leaderboard;
      })
    );
  }

  getHabitsByUser() {
    let fetchedUserId: string;

    return this.authService.userId.pipe(
      take(1),
      switchMap((userId) => {
        fetchedUserId = userId!;
        return this.authService.token;
      }),
      take(1),
      switchMap((token) => {
        return this.http.get<{ [key: string]: HabitData }>(
          `https://habit-today-default-rtdb.europe-west1.firebasedatabase.app/habits.json?auth=${token}`
        );
      }),
      map((habitsData) => {
        const habits: HabitModel[] = [];

        for (const key in habitsData) {
          if (habitsData.hasOwnProperty(key)) {
            //  Only include habits of the current user
            if (habitsData[key].userId === fetchedUserId) {
              habits.push(
                new HabitModel(
                  key,
                  habitsData[key].difficulty,
                  habitsData[key].name,
                  habitsData[key].icon,
                  habitsData[key].userId
                )
              );
            }
          }
        }

        return habits;
      }),
      tap((habits) => {
        this._habits.next(habits);
      })
    );
  }

  resetHabits() {
    this._habits.next([]);
  }

  getHabit(id: string | null): HabitModel | undefined {
    if (!id) {
      return undefined;
    }
    return this._habits.value.find((h: HabitModel) => h.id === id);
    //Vracamo habit koji odgovara id-ju koji smo prosledili
  }
}
