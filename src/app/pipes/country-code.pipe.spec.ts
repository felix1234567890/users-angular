import { CountryCodePipe } from './country-code.pipe';

describe('CountryCodePipe', () => {
  let pipe: CountryCodePipe;

  beforeEach(() => {
    pipe = new CountryCodePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the corresponding country name for a given country code', () => {
    expect(pipe.transform('US')).toBe('United States');
    expect(pipe.transform('IN')).toBe('India');
    expect(pipe.transform('JP')).toBe('Japan');
    // Add more test cases as needed for other country codes
  });

  it('should return the default value when an invalid country code is provided', () => {
    expect(pipe.transform('XX', 'Unknown')).toBe('Unknown');
    expect(pipe.transform('YY', 'Invalid Code')).toBe('Invalid Code');
  });

  it('should return "NO" as default value if no country code and no default value provided', () => {
    expect(pipe.transform('')).toBe('NO');
    expect(pipe.transform('sfafasdgaga')).toBe('NO');
  });
});
