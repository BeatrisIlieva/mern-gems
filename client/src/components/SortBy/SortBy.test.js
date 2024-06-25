import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SortBy } from './SortBy';
import { getSortedByPriceAsc } from '../../utils/getSortedByPriceAsc';
import { getSortedByPriceDesc } from '../../utils/getSortedByPriceDesc';
import { getSortedByAvailabilityAsc } from '../../utils/getSortedByAvailabilityAsc';

jest.mock('../../utils/getSortedByPriceAsc');
jest.mock('../../utils/getSortedByPriceDesc');
jest.mock('../../utils/getSortedByAvailabilityAsc');

describe('<SortBy />', () => {
  const mockSetFilteredJewelries = jest.fn();
  const mockFilteredJewelries = [
    { id: 1, price: 100, available: true },
    { id: 2, price: 50, available: false },
    { id: 3, price: 150, available: true },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders SortBy component with default state', () => {
    render(
      <SortBy
        entityId="1"
        entityTitle="Test Entity"
        filteredJewelries={mockFilteredJewelries}
        setFilteredJewelries={mockSetFilteredJewelries}
      />
    );

    expect(screen.getByText('Sort By:')).toBeInTheDocument();
    expect(screen.getByText('Available Now')).toBeInTheDocument();
  });

//   it('calls getSortedByAvailableNow and updates state on "Available Now" click', () => {
//     getSortedByAvailabilityAsc.mockReturnValue(mockFilteredJewelries);

//     render(
//       <SortBy
//         entityId="1"
//         entityTitle="Test Entity"
//         filteredJewelries={mockFilteredJewelries}
//         setFilteredJewelries={mockSetFilteredJewelries}
//       />
//     );

//     const availableNowButton = screen.getByText('Available Now');
//     fireEvent.click(availableNowButton);

//     expect(getSortedByAvailabilityAsc).toHaveBeenCalledWith(mockFilteredJewelries);
//     expect(mockSetFilteredJewelries).toHaveBeenCalledWith(mockFilteredJewelries);
//   });

//   it('calls getSortedByLowToHigh and updates state on "Price Low To High" click', () => {
//     getSortedByPriceAsc.mockReturnValue(mockFilteredJewelries);

//     render(
//       <SortBy
//         entityId="1"
//         entityTitle="Test Entity"
//         filteredJewelries={mockFilteredJewelries}
//         setFilteredJewelries={mockSetFilteredJewelries}
//       />
//     );

//     const lowToHighButton = screen.getByText('Price Low To High');
//     fireEvent.click(lowToHighButton);

//     expect(getSortedByPriceAsc).toHaveBeenCalledWith(mockFilteredJewelries);
//     expect(mockSetFilteredJewelries).toHaveBeenCalledWith(mockFilteredJewelries);
//   });

//   it('calls getSortedByHighToLow and updates state on "Price High To Low" click', () => {
//     getSortedByPriceDesc.mockReturnValue(mockFilteredJewelries);

//     render(
//       <SortBy
//         entityId="1"
//         entityTitle="Test Entity"
//         filteredJewelries={mockFilteredJewelries}
//         setFilteredJewelries={mockSetFilteredJewelries}
//       />
//     );

//     const highToLowButton = screen.getByText('Price High To Low');
//     fireEvent.click(highToLowButton);

//     expect(getSortedByPriceDesc).toHaveBeenCalledWith(mockFilteredJewelries);
//     expect(mockSetFilteredJewelries).toHaveBeenCalledWith(mockFilteredJewelries);
//   });
});
