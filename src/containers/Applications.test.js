import React from "react";
import { mount } from "enzyme";
import { ApplicationsContainer } from "./Applications";

function setup() {
  const props = {
    versionSelections: [
      {
        name: "some name",
        versions: [{ number: "1.0.0", checked: false }],
        expanded: false
      }
    ],
    onSelectVersion: jest.fn(),
    onToggleExpanded: jest.fn()
  };

  const enzymeWrapper = mount(<ApplicationsContainer {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe("components", () => {
  describe("Applications", () => {
    it("should render self and subcomponents", () => {
      const { enzymeWrapper } = setup();

      // expect(enzymeWrapper.find('header').hasClass('header')).toBe(true)

      expect(enzymeWrapper.find("h1").text()).toBe("Downloads Web");

      const todoInputProps = enzymeWrapper.find("Applications").props();
      expect(todoInputProps.apps).toEqual([
        {
          name: "some name",
          versions: [{ number: "1.0.0", checked: false }],
          expanded: false
        }
      ]);
      // expect(todoInputProps.placeholder).toEqual('What needs to be done?')
    });
  });
});
