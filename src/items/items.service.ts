import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { QueryItemDto } from './dto/query-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const item = this.itemRepository.create(createItemDto);
    return this.itemRepository.save(item);
  }

  async findAll(
    query: QueryItemDto,
  ): Promise<{ items: Item[]; total: number }> {
    const { search, page = 1, limit = 10 } = query;

    const queryBuilder = this.itemRepository.createQueryBuilder('item');
    queryBuilder.where('item.deletedAt IS NULL');

    if (search) {
      queryBuilder.andWhere('LOWER(item.title) LIKE :search', {
        search: `%${search}%`,
      });
    }

    queryBuilder.addSelect(
      `DATE_PART('day', COALESCE(item.updatedAt, NOW()) - item.createdAt) as difference`,
    );

    queryBuilder.orderBy('item.createdAt', 'DESC');

    const [items, total] = await queryBuilder
      .take(limit)
      .skip((page - 1) * limit)
      .getManyAndCount();

    return { items, total };
  }

  async findOne(id: string): Promise<Item> {
    return this.itemRepository.findOne({ where: { id, deletedAt: null } });
  }

  async update(id: string, updateItemDto: UpdateItemDto): Promise<Item> {
    await this.itemRepository.update(id, updateItemDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.itemRepository.softDelete(id);
  }
}
