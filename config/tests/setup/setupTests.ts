import { configure, } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// @ts-ignore
jest.mock('next/router', () => ({
    useRouter() {
        return {
            replace: jest.fn(),
            push: jest.fn(),
            query: {},
            route: 'test'
        };
    }
}));
