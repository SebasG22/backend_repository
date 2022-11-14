import { Injectable, Logger } from '@nestjs/common';
import { Team } from './team.model';

@Injectable()
export class TeamService {
  private teams: Team[] = [
    {
      id: '1',
      background: 'yellow',
      name: 'Qatar',
      flag_icon:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Flag_of_Qatar_%283-2%29.svg/1024px-Flag_of_Qatar_%283-2%29.svg.png',
    },
    {
      id: '2',
      background: 'blue',
      name: 'Netherlands',
      flag_icon:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/1200px-Flag_of_the_Netherlands.svg.png',
    },
    {
      id: '3',
      background: 'blue',
      name: 'Ecuador',
      flag_icon:
        'data:image/png;base64,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',
    },
    {
      id: '4',
      background: 'blue',
      name: 'Senegal',
      flag_icon:
        'https://cdn.britannica.com/70/5070-004-2963C5E1/Flag-Senegal.jpg',
    },
    {
      id: '5',
      background: 'blue',
      name: 'United States',
      flag_icon:
        'https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png',
    },
    {
      id: '6',
      background: 'blue',
      name: 'England',
      flag_icon:
        'https://upload.wikimedia.org/wikipedia/en/thumb/b/be/Flag_of_England.svg/1200px-Flag_of_England.svg.png',
    },
    {
      id: '7',
      background: 'blue',
      name: 'Wales',
      flag_icon:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Flag_of_Wales_%281959%29.svg/2560px-Flag_of_Wales_%281959%29.svg.png',
    },
    {
      id: '8',
      background: 'blue',
      name: 'Iran',
      flag_icon:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Flag_of_Iran.svg/800px-Flag_of_Iran.svg.png',
    },
    {
      id: '9',
      background: 'blue',
      name: 'Mexico',
      flag_icon:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/2560px-Flag_of_Mexico.svg.png',
    },
    {
      id: '10',
      background: 'blue',
      name: 'Argentina',
      flag_icon:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/800px-Flag_of_Argentina.svg.png',
    },
    {
      id: '11',
      background: 'blue',
      name: 'Poland',
      flag_icon:
        'https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Flag_of_Poland.svg/1200px-Flag_of_Poland.svg.png',
    },
    {
      id: '12',
      background: 'blue',
      name: 'Saudi Arabia',
      flag_icon:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Flag_of_Saudi_Arabia_%281938%E2%80%931973%29.svg/2560px-Flag_of_Saudi_Arabia_%281938%E2%80%931973%29.svg.png',
    },
    {
      id: '13',
      background: 'blue',
      name: 'France',
      flag_icon:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%2C_2020%E2%80%93present%29.svg/1200px-Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%2C_2020%E2%80%93present%29.svg.png',
    },
    {
      id: '14',
      background: 'blue',
      name: 'Australia',
      flag_icon:
        'https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_%28converted%29.svg',
    },
    {
      id: '15',
      background: 'blue',
      name: 'Denmark',
      flag_icon:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Flag_of_Denmark.svg/800px-Flag_of_Denmark.svg.png',
    },
    {
      id: '16',
      background: 'blue',
      name: 'Tunisia',
      flag_icon:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Tunisia.svg/2560px-Flag_of_Tunisia.svg.png',
    },
    {
      id: '17',
      background: 'blue',
      name: 'Germany',
      flag_icon:
        'https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1200px-Flag_of_Germany.svg.png',
    },
    {
      id: '18',
      background: 'blue',
      name: 'Spain',
      flag_icon:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/1200px-Bandera_de_Espa%C3%B1a.svg.png',
    },
    {
      id: '19',
      background: 'blue',
      name: 'Japan',
      flag_icon: 'https://flagicon.org/ar.svg',
    },
    {
      id: '20',
      background: 'blue',
      name: 'Costa Rica',
      flag_icon: 'https://flagicon.org/ar.svg',
    },
    {
      id: '21',
      background: 'blue',
      name: 'Belgium',
      flag_icon: 'https://flagicon.org/ar.svg',
    },
    {
      id: '22',
      background: 'blue',
      name: 'Croatia',
      flag_icon: 'https://flagicon.org/ar.svg',
    },
    {
      id: '23',
      background: 'blue',
      name: 'Canada',
      flag_icon: 'https://flagicon.org/ar.svg',
    },
    {
      id: '24',
      background: 'blue',
      name: 'Morocco',
      flag_icon: 'https://flagicon.org/ar.svg',
    },
    {
      id: '25',
      background: 'blue',
      name: 'Brazil',
      flag_icon:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Brazilian_Flag_-_round.svg/512px-Brazilian_Flag_-_round.svg.png',
    },
    {
      id: '26',
      background: 'blue',
      name: 'Serbia',
      flag_icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Flag_of_Serbia.svg/2560px-Flag_of_Serbia.svg.png',
    },
    {
      id: '27',
      background: 'blue',
      name: 'Switzerland',
      flag_icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Switzerland.svg/640px-Flag_of_Switzerland.svg.png',
    },
    {
      id: '28',
      background: 'blue',
      name: 'Cameroon',
      flag_icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Flag_of_Cameroon.svg/2560px-Flag_of_Cameroon.svg.png',
    },
    {
      id: '29',
      background: 'blue',
      name: 'Portugal',
      flag_icon: 'https://boaondaguesthousepeniche.com/wp-content/uploads/2022/06/Bandiera-del-Portogallo-915x610.webp',
    },
    {
      id: '30',
      background: 'blue',
      name: 'Ghana',
      flag_icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Flag_of_Ghana.svg/2560px-Flag_of_Ghana.svg.png',
    },
    {
      id: '31',
      background: 'blue',
      name: 'Uruguay',
      flag_icon: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Uruguay.svg',
    },
    {
      id: '32',
      background: 'blue',
      name: 'South Korea',
      flag_icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/800px-Flag_of_South_Korea.svg.png?20210924062624',
    },
  ];

  getTeams(): Team[] {
    return this.teams;
  }

  getTeamById(teamId: string): Team | undefined {
    return this.teams.find((team) => team.id === teamId);
  }

  createTeam(name: string, flag_icon: string, background: string): Team {
    const id = (this.teams.length + 1).toString(10);
    const newTeam: Team = {
      id,
      name,
      background,
      flag_icon,
    };
    this.teams.push(newTeam);
    Logger.warn(this.teams);
    return newTeam;
  }
}
