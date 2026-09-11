from collections import defaultdict
from typing import Any

from arcengine import FrameData, GameAction, GameState

from ..agent import Agent


class NoveltyMemory(Agent):
    """Deterministic exploration baseline for ARC-AGI-3.

    This draft intentionally uses only simple directional actions. It should be benchmarked
    in the official agent kit before use in any Kaggle notebook.
    """

    MAX_ACTIONS = 160

    def __init__(self, *args: Any, **kwargs: Any) -> None:
        super().__init__(*args, **kwargs)
        self.visits: dict[str, dict[str, int]] = defaultdict(lambda: defaultdict(int))

    def _fingerprint(self, latest_frame: FrameData) -> str:
        grid = latest_frame.frame[-1] if latest_frame.frame else []
        # A compact exact-grid key is enough for a baseline and avoids external dependencies.
        return repr(grid)

    def is_done(self, frames: list[FrameData], latest_frame: FrameData) -> bool:
        return latest_frame.state is GameState.WIN

    def choose_action(
        self, frames: list[FrameData], latest_frame: FrameData
    ) -> GameAction:
        if latest_frame.state in [GameState.NOT_PLAYED, GameState.GAME_OVER]:
            action = GameAction.RESET
            action.reasoning = "Start or restart the environment before exploration."
            return action

        key = self._fingerprint(latest_frame)
        candidates = [
            GameAction.ACTION1,
            GameAction.ACTION2,
            GameAction.ACTION3,
            GameAction.ACTION4,
        ]
        # Explore the least-used simple move from this exact observation.
        candidates.sort(key=lambda item: (self.visits[key][item.name], item.name))
        action = candidates[0]
        self.visits[key][action.name] += 1
        action.reasoning = {
            "agent": "novelty_memory_baseline",
            "observation_visits": sum(self.visits[key].values()),
            "selected": action.name,
            "policy": "least-used simple action for exact visible grid",
        }
        return action
