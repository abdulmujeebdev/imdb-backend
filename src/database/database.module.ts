import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Countries } from "src/movies/entities/countries.entity";
import { Genre } from "src/movies/entities/genre.entity";

@Module({
    imports: [
        ConfigModule.forRoot(),
        // TypeOrmModule.forRoot({
        //     autoLoadEntities: true,
        // }),
    ],
    controllers: [],
    providers: [],
})
export class DatabaseModule { }