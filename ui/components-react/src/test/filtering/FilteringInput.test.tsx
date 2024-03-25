/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render, screen } from "@testing-library/react";
import { expect } from "chai";
import * as React from "react";
import * as sinon from "sinon";
import {
  FilteringInput,
  FilteringInputStatus,
} from "../../components-react/filtering/FilteringInput";
import TestUtils, { selectorMatches, userEvent } from "../TestUtils";

describe("FilteringInput", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });
  before(async () => {
    await TestUtils.initializeUiComponents();
  });

  it("renders correctly", () => {
    render(
      <FilteringInput
        status={FilteringInputStatus.ReadyToFilter}
        onFilterCancel={() => {}}
        onFilterClear={() => {}}
        onFilterStart={() => {}}
        resultSelectorProps={{ onSelectedChanged: () => {}, resultCount: 0 }}
      />
    );

    expect(screen.getByRole("textbox")).to.exist;
    expect(screen.getByTestId("filter-input-search")).to.exist;
  });

  it("shows 'Cancel' button when filtering status is `FilteringInProgress`", () => {
    render(
      <FilteringInput
        status={FilteringInputStatus.FilteringInProgress}
        onFilterCancel={() => {}}
        onFilterClear={() => {}}
        onFilterStart={() => {}}
        resultSelectorProps={{ onSelectedChanged: () => {}, resultCount: 0 }}
      />
    );
    expect(screen.getByTestId("filter-input-close")).to.exist;
  });

  it("shows `ResultSelector` and 'X' button when filtering status is `FilteringFinished` and stepping is enabled", () => {
    render(
      <FilteringInput
        status={FilteringInputStatus.FilteringFinished}
        onFilterCancel={() => {}}
        onFilterClear={() => {}}
        onFilterStart={() => {}}
        resultSelectorProps={{ onSelectedChanged: () => {}, resultCount: 0 }}
      />
    );
    expect(screen.getAllByRole("presentation")[1]).to.satisfy(
      selectorMatches(".components-result-selector-current-result")
    );
    expect(screen.getByTestId("filter-input-close")).to.exist;
  });

  it("doesn't show `ResultSelector` when filtering status is `FilteringFinished` and stepping is disabled", () => {
    render(
      <FilteringInput
        status={FilteringInputStatus.FilteringFinished}
        onFilterCancel={() => {}}
        onFilterClear={() => {}}
        onFilterStart={() => {}}
      />
    );
    expect(screen.queryByRole("presentation")).to.not.satisfy(
      selectorMatches(".components-result-selector-current-result")
    );
    expect(screen.getByTestId("filter-input-close")).to.exist;
  });

  it("starts search when input is edited and 'Enter' key is pressed", async () => {
    const startCallback = sinon.spy();
    render(
      <FilteringInput
        status={FilteringInputStatus.ReadyToFilter}
        onFilterCancel={() => {}}
        onFilterClear={() => {}}
        onFilterStart={startCallback}
        resultSelectorProps={{ onSelectedChanged: () => {}, resultCount: 0 }}
      />
    );

    await theUserTo.type(screen.getByRole("textbox"), "test{Backspace}", {
      skipAutoClose: true,
    });
    expect(startCallback).not.toBeCalled();

    await theUserTo.keyboard("[Enter]");
    expect(startCallback).toHaveBeenCalledOnce();
  });

  it("doesn't start search when input is empty", async () => {
    const startCallback = sinon.spy();
    render(
      <FilteringInput
        status={FilteringInputStatus.ReadyToFilter}
        onFilterCancel={() => {}}
        onFilterClear={() => {}}
        onFilterStart={startCallback}
      />
    );

    await theUserTo.type(screen.getByRole("textbox"), "{Enter}", {
      skipAutoClose: true,
    });
    expect(startCallback).not.toBeCalled();

    await theUserTo.click(screen.getByTitle("general.search"));
    expect(startCallback).not.toBeCalled();
  });

  it("calls appropriate callbacks to different button clicks", async () => {
    const cancelCallback = sinon.spy();
    const clearCallback = sinon.spy();
    const startCallback = sinon.spy();

    const { rerender } = render(
      <FilteringInput
        status={FilteringInputStatus.ReadyToFilter}
        onFilterCancel={cancelCallback}
        onFilterClear={clearCallback}
        onFilterStart={startCallback}
      />
    );

    await theUserTo.type(screen.getByRole("textbox"), "test", {
      skipAutoClose: true,
    });
    await theUserTo.click(screen.getByTitle("general.search"));
    expect(startCallback).toHaveBeenCalledOnce();

    rerender(
      <FilteringInput
        status={FilteringInputStatus.FilteringInProgress}
        onFilterCancel={cancelCallback}
        onFilterClear={clearCallback}
        onFilterStart={startCallback}
      />
    );

    await theUserTo.click(screen.getByTitle("dialog.cancel"));
    expect(cancelCallback).toHaveBeenCalledOnce();

    rerender(
      <FilteringInput
        status={FilteringInputStatus.FilteringFinished}
        resultSelectorProps={{ onSelectedChanged: () => {}, resultCount: 0 }}
        onFilterCancel={cancelCallback}
        onFilterClear={clearCallback}
        onFilterStart={startCallback}
      />
    );

    await theUserTo.click(screen.getByTitle("general.clear"));

    expect(clearCallback).toHaveBeenCalledOnce();
  });

  it("calls onFilterCancel when input text is changed after starting the search", () => {
    const cancelCallback = sinon.spy();

    const filteringInput = render(
      <FilteringInput
        onFilterCancel={cancelCallback}
        onFilterClear={() => {}}
        onFilterStart={() => {}}
        status={FilteringInputStatus.ReadyToFilter}
      />
    );

    const searchBar = filteringInput.container.querySelector(
      '[class="components-filtering-input-input"]'
    )?.firstChild;
    const searchIcon = filteringInput.getByTestId("filter-input-search");
    expect(searchBar).to.exist;
    expect(searchIcon).to.exist;

    fireEvent.change(searchBar as Element, { target: { value: "test" } });
    fireEvent.click(searchIcon as Element);
    fireEvent.change(searchBar as Element, { target: { value: "testing" } });

    expect(cancelCallback).toHaveBeenCalledOnce();
  });

  it("does not render `ResultSelector` but renders `search` button when status is set to `ReadyToFilter`", () => {
    const filteringInput = render(
      <FilteringInput
        onFilterCancel={() => {}}
        onFilterClear={() => {}}
        onFilterStart={() => {}}
        status={FilteringInputStatus.ReadyToFilter}
      />
    );

    expect(
      filteringInput.container.querySelector(
        '[class="components-result-selector"]'
      ),
      "ResultSelector found"
    ).to.not.exist;
    expect(
      filteringInput.getByTestId("filter-input-search"),
      "Search icon found"
    ).to.exist;
  });

  it("does not render `ResultSelector` but renders `X` button when status is set to `FilteringInProgress`", () => {
    const filteringInput = render(
      <FilteringInput
        onFilterCancel={() => {}}
        onFilterClear={() => {}}
        onFilterStart={() => {}}
        status={FilteringInputStatus.FilteringInProgress}
      />
    );

    expect(
      filteringInput.container.querySelector(
        '[class="components-result-selector"]'
      ),
      "ResultSelector found"
    ).to.not.exist;
    expect(filteringInput.getByTestId("filter-input-close"), "X button found")
      .to.exist;
  });

  it("renders `ResultSelector` and 'X' button when status is set to `FilteringFinished` and `resultSelectorProps` are provided ", () => {
    const filteringInput = render(
      <FilteringInput
        onFilterCancel={() => {}}
        onFilterClear={() => {}}
        onFilterStart={() => {}}
        status={FilteringInputStatus.FilteringFinished}
        resultSelectorProps={{ onSelectedChanged: () => {}, resultCount: 0 }}
      />
    );

    expect(
      filteringInput.container.querySelector(
        '[class="components-result-selector"]'
      ),
      "ResultSelector found"
    ).to.exist;
    expect(filteringInput.getByTestId("filter-input-close"), "X button found")
      .to.exist;
  });

  it("doesn't render `ResultSelector` but renders 'X' button when status is set to `FilteringFinished` and `resultSelectorProps` are not provided ", () => {
    const filteringInput = render(
      <FilteringInput
        onFilterCancel={() => {}}
        onFilterClear={() => {}}
        onFilterStart={() => {}}
        status={FilteringInputStatus.FilteringFinished}
      />
    );

    expect(
      filteringInput.container.querySelector(
        '[class="components-result-selector"]'
      ),
      "ResultSelector found"
    ).to.not.exist;
    expect(filteringInput.getByTestId("filter-input-close"), "X button found")
      .to.exist;
  });

  it("re-renders ResultSelector(sets activeMatchIndex to 1) when resultSelectorProps are updated when using status property", () => {
    const filteringInput = render(
      <FilteringInput
        onFilterCancel={() => {}}
        onFilterClear={() => {}}
        onFilterStart={() => {}}
        resultSelectorProps={{ onSelectedChanged: () => {}, resultCount: 5 }}
        status={FilteringInputStatus.FilteringFinished}
      />
    );

    expect(filteringInput.getByText("1")).to.exist;
    const nextButton = filteringInput.getByTestId("next-button");
    expect(nextButton).to.exist;
    fireEvent.click(nextButton as Element);

    expect(filteringInput.getByText("2")).to.exist;

    filteringInput.rerender(
      <FilteringInput
        onFilterCancel={() => {}}
        onFilterClear={() => {}}
        onFilterStart={() => {}}
        resultSelectorProps={{ onSelectedChanged: () => {}, resultCount: 5 }}
        status={FilteringInputStatus.FilteringFinished}
      />
    );

    expect(filteringInput.getByText("1")).to.exist;
  });
});
