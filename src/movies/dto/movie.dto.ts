// import Joi from 'joi';

export class CreateMovieDto {
    public name: string;
    public description: string;
    public release_date: string;
    public ticket_price: number;
    public country_id: number;
    public genre_id: number;
    public photo: string;
}

export class UpdateMovieDto {
    public name: string;
    public description: string;
    public release_date: string;
    public ticket_price: number;
    public country_id: number;
    public genre_id: number;
    public photo: string;
}

// export const MovieSchema = Joi.object({
//     name: Joi.string().required(),
//     description: Joi.string(),
//     release_date: Joi.date().required(),
//     ticket_price: Joi.number().required(),
//     genre_id: Joi.string().required(),
//     country_id: Joi.string().required(),
//     photo: Joi.string(),
// }).options({
//     abortEarly: false,
// });
