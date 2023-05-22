// seeds/countries.seeder.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { Countries } from '../../movies/entities/countries.entity'
import * as path from 'path';

@Injectable()
export class CountriesSeeder {
    constructor(
        @InjectRepository(Countries) private repository: Repository<Countries>,
    ) { }

    async run() {
        const filePath = path.resolve(__dirname, 'countries.json');

        try {
            const countriesData = fs.readFileSync(filePath, 'utf8');
            const countries = JSON.parse(countriesData);
            const data = await this.repository.create(countries);
            await this.repository.save(data);
            console.log('Countries seeded successfully:', countries.length);
        } catch (error) {
            console.error('Error seeding countries:', error);
        }
    }
}
