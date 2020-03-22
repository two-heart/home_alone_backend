import { Injectable } from '@nestjs/common';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { Challenge } from '../challenge/challenge.entity';
import { Category } from '../category/category.entity';
import { Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

interface ChallengeRow {
  category: string;
  title: string;
  description: string;
  imageUrl: string;
}

@Injectable()
export class SyncService {
  constructor(private connection: Connection) {}
  private readonly spreadsheet = new GoogleSpreadsheet(
    '1QqiG0bguy3G-p4u4ArlBgtYQ4cuU8fdHDSf9aoOjUWY',
  );

  private async loadSheetInfo() {
    await this.spreadsheet.useApiKey('AIzaSyBTziC1TQnXFl0ahFJEWPdRVYLITopV1ao');
    await this.spreadsheet.loadInfo();
  }

  private async loadRows(): Promise<ChallengeRow[]> {
    await this.loadSheetInfo();
    const sheet = this.spreadsheet.sheetsByIndex[1];
    return await sheet.getRows();
  }

  async sync(): Promise<Challenge[]> {
    const rows = await this.loadRows();
    const categories = [...new Set(rows.map(challenge => challenge.category))];
    let dbCategories: Category[] = categories.map(categoryName => {
      return {
        name: categoryName,
      } as Category;
    });

    return await this.connection.transaction(async manager => {
      dbCategories = await manager.getRepository(Category).save(dbCategories);
      const challenges = dbCategories.map(category =>
        rows
          .filter(row => row.category == category.name)
          .map(
            row =>
              ({
                name: row.title,
                teaser: '',
                description: row.description,
                imageUrl: row.imageUrl,
                category: category,
              } as Challenge),
          ),
      );
      return await manager.getRepository(Challenge).save(challenges.flat());
    });
  }
}
