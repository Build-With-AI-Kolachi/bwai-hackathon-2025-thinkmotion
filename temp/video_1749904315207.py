```python
from manim import *

class SquareOfSum(Scene):
    def construct(self):
        # Scene setup
        self.camera.background_color = "#111111"

        # Define colors
        square_color = BLUE_D
        a_color = YELLOW_D
        b_color = GREEN_D

        # Define lengths
        a_length = 2
        b_length = 1

        # Create the square
        square = Square(side_length=a_length + b_length, color=WHITE)
        self.play(Create(square))

        # Create the subdivisions
        a_square = Square(side_length=a_length, color=a_color, fill_opacity=0.7)
        a_square.move_to(square.get_center() + (a_length + b_length) / 2 * LEFT + (a_length + b_length) / 2 * UP - a_length/2 * RIGHT - a_length/2 * DOWN)
        b_square = Square(side_length=b_length, color=b_color, fill_opacity=0.7)
        b_square.move_to(square.get_center() + (a_length + b_length) / 2 * RIGHT + (a_length + b_length) / 2 * DOWN - b_length/2 * LEFT - b_length/2 * UP)

        a_rect = Rectangle(width=a_length, height=b_length, color=a_color, fill_opacity=0.5)
        a_rect.move_to(square.get_center() + (a_length + b_length) / 2 * LEFT + (a_length + b_length) / 2 * DOWN - a_length/2 * RIGHT - b_length/2 * UP)
        b_rect = Rectangle(width=b_length, height=a_length, color=b_color, fill_opacity=0.5)
        b_rect.move_to(square.get_center() + (a_length + b_length) / 2 * RIGHT + (a_length + b_length) / 2 * UP - b_length/2 * LEFT - a_length/2 * DOWN)

        # Animation: Create subdivisions
        self.play(
            Create(a_square),
            Create(b_square),
            Create(a_rect),
            Create(b_rect),
            run_time=2
        )

        # Text explanations
        a_squared = MathTex("a^2", color=a_color).move_to(a_square.get_center())
        b_squared = MathTex("b^2", color=b_color).move_to(b_square.get_center())
        ab_1 = MathTex("ab", color=WHITE).move_to(a_rect.get_center())
        ab_2 = MathTex("ab", color=WHITE).move_to(b_rect.get_center())

        self.play(Write(a_squared), Write(b_squared), Write(ab_1), Write(ab_2), run_time=1.5)
        self.wait(0.5)

        # Formula
        formula = MathTex("(a + b)^2 = a^2 + b^2 + 2ab", color=WHITE).to_edge(DOWN)
        self.play(Write(formula), run_time=2)
        self.wait(2)

        # Move the squares and rectangles to show the formula
        self.play(
            a_square.animate.move_to(LEFT * 3 + UP * 1.5),
            b_square.animate.move_to(LEFT * 3 + DOWN * 1.5),
            a_rect.animate.move_to(RIGHT * 3 + UP * 1.5),
            b_rect.animate.move_to(RIGHT * 3 + DOWN * 1.5),
            a_squared.animate.move_to(LEFT * 3 + UP * 1.5),
            b_squared.animate.move_to(LEFT * 3 + DOWN * 1.5),
            ab_1.animate.move_to(RIGHT * 3 + UP * 1.5),
            ab_2.animate.move_to(RIGHT * 3 + DOWN * 1.5),
            run_time = 2
        )
        self.wait(2)

        self.play(FadeOut(a_square,b_square,a_rect,b_rect,a_squared,b_squared,ab_1,ab_2, square, formula), run_time=1)
        self.wait(1)
```