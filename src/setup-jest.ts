import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv();

// Add global test configuration here
Object.defineProperty(window, 'CSS', {value: null});
Object.defineProperty(window, 'getComputedStyle', {
  value: () => {
    return {
      display: 'none',
      appearance: ['-webkit-appearance']
    };
  }
});

Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>'
});

Object.defineProperty(document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true
    };
  }
});

// Mock Chart.js for tests
const mockChart = jest.fn().mockImplementation(() => ({
  destroy: jest.fn(),
  update: jest.fn(),
  data: {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [],
      borderColor: [],
    }]
  },
  config: {
    type: 'bar',
    options: {
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true, callbacks: {} },
        datalabels: { display: false }
      },
      scales: {
        x: { display: false },
        y: { display: true, ticks: { callback: jest.fn() } }
      }
    }
  }
}));

mockChart.register = jest.fn();

jest.mock('chart.js', () => ({
  Chart: mockChart,
  registerables: []
}));

jest.mock('chartjs-plugin-datalabels', () => ({}));

// Mock HTMLCanvasElement.getContext
HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
  fillStyle: '',
  strokeStyle: '',
  clearRect: jest.fn(),
  fillRect: jest.fn(),
  strokeRect: jest.fn(),
  beginPath: jest.fn(),
  closePath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  arc: jest.fn(),
  fill: jest.fn(),
  stroke: jest.fn(),
  save: jest.fn(),
  restore: jest.fn(),
  translate: jest.fn(),
  rotate: jest.fn(),
  scale: jest.fn(),
  drawImage: jest.fn(),
  createLinearGradient: jest.fn(() => ({
    addColorStop: jest.fn()
  })),
  createRadialGradient: jest.fn(() => ({
    addColorStop: jest.fn()
  })),
  createPattern: jest.fn(),
  measureText: jest.fn(() => ({ width: 0 }))
}));