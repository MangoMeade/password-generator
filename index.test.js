import { render, screen } from "@testing-library/react";
import App from "./pages/index";

describe('true is truthy and false is falsy', () => {
    test('true is truthy', () => {
      expect(true).toBe(true);
    });
   
    test('false is falsy', () => {
      expect(false).toBe(false);
    });
  });

  function sum(x, y) {
    return x + y;
  }
   
  describe('sum', () => {
    test('sums up two values', () => {
      expect(sum(2, 4)).toBe(6);
    });
  });

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
    expect(
      screen.getByText('Explore')
    ).toBeInTheDocument();
  });
});

describe("App", () => {
    it("get placeholder", () => {
      render(<App />);
      expect(
        screen.getByPlaceholderText('Escribe texto aqui...')
      ).toBeInTheDocument();
    });
  });