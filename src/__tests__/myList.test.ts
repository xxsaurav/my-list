import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app'; // your Express app
import connectDB from '../db/db';
import { MyList } from '../models/myList';
import { ContentType } from '../types/ContentType';
import { mockMovie, mockTVShow } from '../constants/mockConstants';

describe('My List API Integration Tests', () => {
  const mockUserId = 'user_123';
  let movieId: string;
  let tvShowId: string;

  beforeAll(async () => {
    await connectDB();

    // Insert a mock movie & tv show
    

    movieId = mockMovie.id;
    tvShowId = mockTVShow.id;
  });

  afterAll(async () => {
    await MyList.deleteMany({ userId: mockUserId });
     await mongoose.disconnect();
    await mongoose.connection.close();
  });

  it('should add a movie to My List', async () => {
    const res = await request(app)
      .post('/api/mylist')
      .send({ contentId: movieId, contentType: ContentType.Movie });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Item added to My List');
  });

  it('should not add a duplicate movie to My List', async () => {
    const res = await request(app)
      .post('/api/mylist')
      .send({ contentId: movieId, contentType: ContentType.Movie });

    expect(res.status).toBe(409);
    expect(res.body.message).toMatch(/already exists/i);
  });

  it('should add a TV show to My List', async () => {
    const res = await request(app)
      .post('/api/mylist')
      .send({ contentId: tvShowId, contentType: ContentType.TVShow });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Item added to My List');
  });

  it('should list items in My List', async () => {
    const res = await request(app).get('/api/mylist?page=1&limit=10');
    expect(res.status).toBe(200);
    expect(res.body.items).toBeDefined();
    expect(Array.isArray(res.body.items)).toBe(true);
  });

  it('should remove a movie from My List', async () => {
    const res = await request(app)
      .delete(`/api/mylist/${movieId}`)
      .send({ contentType: ContentType.Movie });

    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/removed/i);
  });
});
