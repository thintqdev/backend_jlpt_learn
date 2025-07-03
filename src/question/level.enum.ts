import { registerEnumType } from '@nestjs/graphql';

export enum EnumLevel {
  N5 = 'N5',
  N4 = 'N4',
  N3 = 'N3',
  N2 = 'N2',
  N1 = 'N1',
}

registerEnumType(EnumLevel, {
  name: 'EnumLevel',
});
