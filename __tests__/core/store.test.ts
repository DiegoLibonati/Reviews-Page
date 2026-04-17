import { Store } from "@/core/store";

interface TestState extends Record<string, unknown> {
  count: number;
  name: string;
}

class TestStore extends Store<TestState> {
  // constructor(initialState: TestState) {
  //   super(initialState);
  // }
}

const mockInitialState: TestState = { count: 0, name: "test" };

describe("Store", () => {
  let store: TestStore;

  beforeEach(() => {
    store = new TestStore({ ...mockInitialState });
  });

  describe("getState", () => {
    it("should return the initial state", () => {
      expect(store.getState()).toEqual(mockInitialState);
    });
  });

  describe("get", () => {
    it("should return the value for the count key", () => {
      expect(store.get("count")).toBe(0);
    });

    it("should return the value for the name key", () => {
      expect(store.get("name")).toBe("test");
    });
  });

  describe("setState", () => {
    it("should update a specific key in state", () => {
      store.setState({ count: 5 });
      expect(store.getState().count).toBe(5);
    });

    it("should merge new values without removing other keys", () => {
      store.setState({ count: 5 });
      expect(store.getState().name).toBe("test");
    });

    it("should notify listener when value changes", () => {
      const mockListener = jest.fn();
      store.subscribe("count", mockListener);
      store.setState({ count: 1 });
      expect(mockListener).toHaveBeenCalledWith(1);
    });

    it("should not notify listener when value does not change", () => {
      const mockListener = jest.fn();
      store.subscribe("count", mockListener);
      store.setState({ count: 0 });
      expect(mockListener).not.toHaveBeenCalled();
    });

    it("should only notify listeners for the changed key", () => {
      const mockCountListener = jest.fn();
      const mockNameListener = jest.fn();
      store.subscribe("count", mockCountListener);
      store.subscribe("name", mockNameListener);
      store.setState({ count: 10 });
      expect(mockCountListener).toHaveBeenCalledTimes(1);
      expect(mockNameListener).not.toHaveBeenCalled();
    });

    it("should notify multiple listeners registered for the same key", () => {
      const mockListener1 = jest.fn();
      const mockListener2 = jest.fn();
      store.subscribe("count", mockListener1);
      store.subscribe("count", mockListener2);
      store.setState({ count: 99 });
      expect(mockListener1).toHaveBeenCalledWith(99);
      expect(mockListener2).toHaveBeenCalledWith(99);
    });
  });

  describe("subscribe", () => {
    it("should invoke listener when subscribed key changes", () => {
      const mockListener = jest.fn();
      store.subscribe("name", mockListener);
      store.setState({ name: "updated" });
      expect(mockListener).toHaveBeenCalledWith("updated");
    });

    it("should return an unsubscribe function that stops notifications", () => {
      const mockListener = jest.fn();
      const unsubscribe = store.subscribe("count", mockListener);
      unsubscribe();
      store.setState({ count: 5 });
      expect(mockListener).not.toHaveBeenCalled();
    });

    it("should not remove other listeners when one unsubscribes", () => {
      const mockListener1 = jest.fn();
      const mockListener2 = jest.fn();
      const unsubscribe1 = store.subscribe("count", mockListener1);
      store.subscribe("count", mockListener2);
      unsubscribe1();
      store.setState({ count: 7 });
      expect(mockListener1).not.toHaveBeenCalled();
      expect(mockListener2).toHaveBeenCalledWith(7);
    });
  });
});
