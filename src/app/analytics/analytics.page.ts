import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { HabitsService } from '../habits/habitsService';
import { HabitModel } from '../habits/habit.model';

interface ActivityRecord {
  habitName: string;
  timestamp: number;
  dayLabel?: string;
}

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.page.html',
  styleUrls: ['./analytics.page.scss'],
  standalone: false
})
export class AnalyticsPage implements OnInit, OnDestroy {
  totalActivities = 0;
  avgPerDay = 0;
  bestDayLabel = '';
  last7Days: { label: string; dateKey: string }[] = [];
  activitiesByDayMap: { [dateKey: string]: number } = {};
  recentActivities: ActivityRecord[] = [];
  private sub?: Subscription;

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private habitsService: HabitsService) {}

  ngOnInit() {
    this.loadAnalytics();
  }

  loadAnalytics() {
    this.sub = this.habitsService.getHabitsByUser().pipe(take(1)).subscribe((habits: HabitModel[]) => {
      const allActivities: ActivityRecord[] = [];

      habits.forEach(h => {
        if ((h as any).activities) {
          (h as any).activities.forEach((ts: number) => {
            allActivities.push({ habitName: h.name, timestamp: ts });
          });
        }
      });

      this.totalActivities = allActivities.length;

      const today = new Date();
      this.last7Days = Array.from({ length: 7 }).map((_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        const dateKey = d.toISOString().slice(0, 10);
        return { label: d.toLocaleDateString('sr-RS', { weekday: 'short' }), dateKey };
      }).reverse();

      this.activitiesByDayMap = {};
      allActivities.forEach(act => {
        const key = new Date(act.timestamp).toISOString().slice(0, 10);
        this.activitiesByDayMap[key] = (this.activitiesByDayMap[key] || 0) + 1;
      });

      this.avgPerDay = this.last7Days.length > 0 ? allActivities.length / this.last7Days.length : 0;

      let max = 0;
      let bestKey = '';
      for (const [key, val] of Object.entries(this.activitiesByDayMap)) {
        if (val > max) {
          max = val;
          bestKey = key;
        }
      }
      this.bestDayLabel = bestKey
        ? new Date(bestKey).toLocaleDateString('sr-RS', { weekday: 'long', day: 'numeric', month: 'short' })
        : '';

      this.recentActivities = allActivities
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 10)
        .map(a => ({
          ...a,
          dayLabel: new Date(a.timestamp).toLocaleDateString('sr-RS', { day: 'numeric', month: 'short' }),
        }));
    });
  }

  getDayPercent(count: number) {
    const maxCount = Math.max(...Object.values(this.activitiesByDayMap), 1);
    return (count / maxCount) * 100;
  }

  recTimestamp(ts: number) {
    return new Date(ts).toLocaleTimeString('sr-RS', { hour: '2-digit', minute: '2-digit' });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
