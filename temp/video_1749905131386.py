```python
from manim import *

class SquareDifference(Scene):
    def construct(self):
        self.camera.background_color = "#111111"

        # Setup
        square_side = 3
        square = Square(side_length=square_side, color=BLUE, fill_opacity=0.5).move_to(ORIGIN)

        a = 2
        b = 1

        a_line = Line(start=square.get_corner(UL), end=square.get_corner(UR) + DOWN * b, color=YELLOW)
        b_line = Line(start=square.get_corner(DR), end=square.get_corner(UR) + DOWN * b, color=YELLOW)

        a_brace = Brace(a_line, direction=LEFT, color=WHITE)
        b_brace = Brace(b_line, direction=RIGHT, color=WHITE)

        a_text = Tex("a", color=WHITE).next_to(a_brace, LEFT)
        b_text = Tex("b", color=WHITE).next_to(b_brace, RIGHT)

        self.play(Create(square), run_time=1)
        self.play(Create(a_line), Create(b_line), run_time=1)
        self.play(Create(a_brace), Create(b_brace), run_time=1)
        self.play(Write(a_text), Write(b_text), run_time=1)

        # (a - b)^2
        a_minus_b_square = Square(side_length=square_side - b, color=GREEN, fill_opacity=0.7).move_to(square.get_center())
        a_minus_b_square.shift((square_side - b) / 2 * (LEFT + UP))

        a_minus_b_text = Tex("$(a-b)^2$", color=WHITE).move_to(a_minus_b_square.get_center())

        self.play(Create(a_minus_b_square), run_time=1)
        self.play(Write(a_minus_b_text), run_time=1)
        self.wait(0.5)

        # Formula
        formula = MathTex("(a-b)^2 = a^2 - 2ab + b^2", color=WHITE).move_to(DOWN * 2.5)

        self.play(Write(formula))
        self.wait(1)

        # Highlight a^2
        a_squared_rect = SurroundingRectangle(square, color=BLUE, buff=0.1)
        a_squared_text = Tex("$a^2$", color=WHITE).move_to(square.get_center() + DOWN * 0.75 * square_side)
        self.play(Create(a_squared_rect), Write(a_squared_text))
        self.wait(0.5)

        # Highlight b^2
        b_squared_square = Square(side_length=b, color=YELLOW, fill_opacity=0.8).move_to(square.get_corner(DR) + 0.5 * b * (LEFT + UP))
        b_squared_text = Tex("$b^2$", color=WHITE).move_to(b_squared_square.get_center())
        b_squared_rect = SurroundingRectangle(b_squared_square, color=YELLOW, buff=0.1)

        self.play(Create(b_squared_square), Write(b_squared_text))
        self.wait(0.5)
        self.play(Create(b_squared_rect))
        self.wait(0.5)
        self.play(FadeOut(a_squared_rect), FadeOut(a_squared_text), FadeOut(b_squared_rect), FadeOut(b_squared_text))

        # Highlight -2ab
        ab_rect1 = Rectangle(width=a, height=b, color=RED, fill_opacity=0.7).move_to(square.get_corner(UL) + DOWN * b / 2 + RIGHT * a / 2)
        ab_rect2 = Rectangle(width=b, height=a, color=RED, fill_opacity=0.7).move_to(square.get_corner(DR) + UP * a / 2 + LEFT * b / 2)

        ab_text1 = Tex("$ab$", color=WHITE).move_to(ab_rect1.get_center())
        ab_text2 = Tex("$ab$", color=WHITE).move_to(ab_rect2.get_center())

        self.play(Create(ab_rect1), Create(ab_rect2), Write(ab_text1), Write(ab_text2))
        self.wait(0.5)

        minus_2ab_text = Tex("$-2ab$", color=WHITE).move_to(formula.get_center() + UP)
        self.play(Write(minus_2ab_text))
        self.wait(1)

        # End
        self.wait(2)
```