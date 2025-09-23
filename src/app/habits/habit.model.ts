export class HabitModel {
  constructor(
    public id: string,
    public difficulty: number,
    public name: string,
    public icon: string,
    public userId: string
  ) {}
}
