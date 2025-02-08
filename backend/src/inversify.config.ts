import { Container } from 'inversify';
import { CurrencyService } from './services/currency.service';
import { CurrencyController } from './controllers/currency.controller';
import { CurrencyRepository } from './repositories/currency.repository';

const container = new Container();

// Bind services and controllers to the container
container.bind<CurrencyService>(CurrencyService).to(CurrencyService);
container.bind<CurrencyController>(CurrencyController).to(CurrencyController);
container.bind<CurrencyRepository>(CurrencyRepository).to(CurrencyRepository);

export { container };
