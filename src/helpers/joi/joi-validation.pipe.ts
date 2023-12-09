import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

interface ValidationObject {
  body?: object;
  params?: object;
  query?: object;
}

interface ExtraOptions {
  fallbackOnLargePageSize?: boolean;
}

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(
    private readonly schema: ValidationObject,
    private readonly extraOptions: ExtraOptions = {},
  ) {}

  transform(value: any, metadata: ArgumentMetadata) {
    let schema;

    if (metadata.type === 'body' && this.schema.body) {
      schema = this.schema.body;
      if (
        this.extraOptions.fallbackOnLargePageSize &&
        Number(value['page-size']) &&
        Number(value['page-size']) > 30
      ) {
        // eslint-disable-next-line
        value['page-size'] = 20;
      }
    } else if (metadata.type === 'query' && this.schema.query) {
      schema = this.schema.query;
    } else if (metadata.type === 'param' && this.schema.params) {
      schema = this.schema.params;
    } else {
      return value;
    }

    const { error } = schema.validate(value);
    if (error) {
      const [{ message }] = error.details;
      throw new HttpException(message, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return value;
  }
}
