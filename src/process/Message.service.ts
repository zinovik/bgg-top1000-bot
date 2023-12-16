import { ProcessService } from './ProcessService.interface';
import { Data } from '../common/model/Data.interface';

type Game = { rank: number; name: string; year: string };

export class MessageService implements ProcessService {
  formatMessage({ newData, oldData }: { newData: Data; oldData: Data }): string {
    const date = this.getDateString('On date', newData.date);
    const oldDate = this.getDateString('Changes from date', oldData.date);

    const newGames: Game[] = [];
    const droppedGames: Game[] = oldData.games.filter((oldGame) =>
      newData.games.every((newGame) => newGame.id !== oldGame.id),
    );
    const increasedGames: { [change: string]: Game[] } = {};
    const decreasedGames: { [change: string]: Game[] } = {};

    newData.games.forEach((game) => {
      const oldGame = oldData.games.find((old) => old.id === game.id);

      if (!oldGame) {
        newGames.push(game);
        return;
      }

      const change = oldGame.rank - game.rank;

      if (change > 1) increasedGames[change] = [...(increasedGames[change] || []), game];
      if (change < -1) decreasedGames[change] = [...(decreasedGames[change] || []), game];
    });

    const newGamesString = this.getAdditionalList('🆕 Game(s) new in Top 1000', newGames);
    const droppedGamesString = this.getAdditionalList('❌ Game(s) dropped out of Top 1000', droppedGames);

    const increasedGamesStrings = Object.keys(increasedGames)
      .sort((change1, change2) => Number(change2) - Number(change1))
      .map((change) =>
        this.getAdditionalList(`⬆️ ${change} position${Number(change) > 1 ? 's' : ''} up`, increasedGames[change]),
      );

    const decreasedGamesStrings = Object.keys(decreasedGames)
      .sort((change1, change2) => Number(change1) - Number(change2))
      .map((change) =>
        this.getAdditionalList(`⬇️ ${change} position${Number(change) < -1 ? 's' : ''} down`, decreasedGames[change]),
      );

    return `${date}\n\n${oldDate}\n\n${newGamesString}\n\n${droppedGamesString}\n\n\n${increasedGamesStrings.join(
      '\n\n',
    )}\n\n\n${decreasedGamesStrings.join('\n\n')}`;
  }

  private getDateString(text: string, date: string): string {
    const options = {
      timeZoneName: 'short',
      hour: 'numeric',
      minute: 'numeric',
    } as const;
    const dateString = new Date(date).toLocaleString('en-US', options);

    return `${text}:\n${date.slice(0, 10)} ${dateString}`;
  }

  private getAdditionalList(text: string, games: Game[]): string {
    const gamesString = games.map((game) => this.formatGame(game)).join('\n');

    return `${text}:\n${gamesString || 'none'}`;
  }

  private formatGame(game: { rank: number; name: string; year: string }, changeString = ''): string {
    return `${game.rank}. ${game.name} (${game.year})${changeString}`;
  }
}
