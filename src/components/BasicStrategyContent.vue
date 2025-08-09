<script setup>

</script>

<template>

  <div class="blackjack-content greenBG">
    <!-- Hero Section -->
    <header class="hero-section">
      <h1 class="main-title">
        Master Blackjack Basic Strategy - Perfect Your Game
      </h1>
      <p class="hero-description">
        Learning blackjack <strong>basic strategy</strong> doesn't have to be overwhelming. Whether you're looking for a reliable blackjack trainer approach or want to understand how professional blackjack coaches teach <strong>mathematically perfect play</strong>,
         this guide breaks everything down into digestible steps that anyone can master.
      </p>
    </header>

    <!-- Basic Strategy Introduction Section -->
    <section class="content-section">
      <h2 class="section-title">Section 1: What is Blackjack Basic Strategy?</h2>
      
      <div class="content-with-image">
        <div class="text-content">
          <p class="content-text">
            Blackjack basic strategy is a mathematically calculated set of decisions that tells you the optimal play for every possible hand combination in blackjack. 
            When you follow perfect basic strategy, you can reduce the house edge to as low as 0.5%, making blackjack one of the best casino games for players.
          </p>
          <p class="content-text">
            Think of it like this – every blackjack trainer worth their salt will tell you that basic strategy is where serious players start. Here's why it works:
          </p>
          <p class="content-text">
            <strong>Mathematical Foundation:</strong> Every decision in basic strategy is based on millions of computer simulations. A good blackjack coach will tell you that this isn't guesswork – it's pure mathematics.
          </p>
          <p class="content-text">
            <strong>House Edge Reduction:</strong> Without basic strategy, the house edge can be 2-4%. With perfect basic strategy, you can reduce it to just 0.5% in most games.
          </p>
          <p class="content-text">
            <strong>Universal Application:</strong> Basic strategy works whether you're playing in Las Vegas, online, or anywhere else with standard blackjack rules.
          </p>
          <p class="content-text">
            This isn't just theory – any quality blackjack simulator will confirm that basic strategy is the foundation of successful blackjack play.
          </p>
        </div>
      </div>
    </section>

    <!-- Strategy Charts Section -->
    <section class="content-section">
      <h2 class="section-title">Section 2: How to Use Basic Strategy Charts for 4-8 Decks</h2>
      
      <div class="content-with-image">
        <div class="text-content">
          <p class="content-text">Now that you understand what basic strategy is, let's talk about how to use the charts – this is where your blackjack basic strategy journey really begins.
             Every professional blackjack trainer emphasizes this as the crucial foundation.
          </p>

          <p class="content-text">Basic strategy charts are organized into three main categories that cover every possible situation:</p>

          <p class="content-text">
            <strong>Hard Totals Chart:</strong> Hard hands are any hand without an Ace, or hands where the Ace must be counted as 1 to avoid busting.
            This covers the majority of hands you'll encounter.
          </p>

          <p class="content-text">
            <strong>Soft Totals Chart:</strong> Soft hands contain an Ace that can be counted as either 1 or 11 without busting.
            These hands offer more flexibility and often different optimal plays.
          </p>
          
          <p class="content-text">
            <strong>Pair Splitting Chart:</strong> When you're dealt a pair, you have the option to split them into two separate hands.
            The splitting chart tells you exactly when this is profitable.
          </p>

          <p class="content-text">Here's something cool that most blackjack simulators will demonstrate: these charts apply to the most common casino conditions – 4-8 decks, dealer stands on soft 17, and double after split allowed.</p>
        </div>

      </div>

      <!-- Basic Strategy Chart -->
      <div class="strategy-chart">
        <h3 class="subsection-title">Complete Basic Strategy Chart (4-8 Decks)</h3>
        
        <table>
        <thead>
            <tr>
                <th colspan="2">Your Hand</th>
                <th colspan="10">Dealer's Upcard</th>
            </tr>
            <tr>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col">2</th>
                <th scope="col">3</th>
                <th scope="col">4</th>
                <th scope="col">5</th>
                <th scope="col">6</th>
                <th scope="col">7</th>
                <th scope="col">8</th>
                <th scope="col">9</th>
                <th scope="col">10</th>
                <th scope="col">A</th>
            </tr>
        </thead>
        <tbody>
            <tr><th scope="row" rowspan="10" style="writing-mode: vertical-rl; text-orientation: mixed;">Hard Totals</th>
                <th scope="row">8</th>
                <td class="hit">H</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td>
            </tr>
            <tr>
                <th scope="row">9</th>
                <td class="hit">H</td><td class="double-hit">D/H</td><td class="double-hit">D/H</td><td class="double-hit">D/H</td><td class="double-hit">D/H</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td>
            </tr>
            <tr>
                <th scope="row">10</th>
                <td class="double-hit">D/H</td><td class="double-hit">D/H</td><td class="double-hit">D/H</td><td class="double-hit">D/H</td><td class="double-hit">D/H</td><td class="double-hit">D/H</td><td class="double-hit">D/H</td><td class="double-hit">D/H</td><td class="hit">H</td><td class="hit">H</td>
            </tr>
            <tr>
                <th scope="row">11</th>
                <td class="double-hit">D/H</td><td class="double-hit">D/H</td><td class="double-hit">D/H</td><td class="double-hit">D/H</td><td class="double-hit">D/H</td><td class="double-hit">D/H</td><td class="double-hit">D/H</td><td class="double-hit">D/H</td><td class="double-hit">D/H</td><td class="double-hit">D/H</td>
            </tr>
            <tr>
                <th scope="row">12</th>
                <td class="hit">H</td><td class="hit">H</td><td class="stand">S</td><td class="stand">S</td><td class="stand">S</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td>
            </tr>
            <tr>
                <th scope="row">13</th>
                <td class="stand">S</td><td class="stand">S</td><td class="stand">S</td><td class="stand">S</td><td class="stand">S</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td>
            </tr>
            <tr>
                <th scope="row">14</th>
                <td class="stand">S</td><td class="stand">S</td><td class="stand">S</td><td class="stand">S</td><td class="stand">S</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td>
            </tr>
            <tr>
                <th scope="row">15</th>
                <td class="stand">S</td><td class="stand">S</td><td class="stand">S</td><td class="stand">S</td><td class="stand">S</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td><td class="surrender-hit">R/H</td><td class="hit">H</td>
            </tr>
            <tr>
                <th scope="row">16</th>
                <td class="stand">S</td><td class="stand">S</td><td class="stand">S</td><td class="stand">S</td><td class="stand">S</td><td class="hit">H</td><td class="hit">H</td><td class="surrender-hit">R/H</td><td class="surrender-hit">R/H</td><td class="surrender-hit">R/H</td>
            </tr>
            <tr>
                <th scope="row">17+</th>
                <td class="stand">S</td><td class="stand">S</td><td class="stand">S</td><td class="stand">S</td><td class="stand">S</td><td class="stand">S</td><td class="stand">S</td><td class="stand">S</td><td class="stand">S</td><td class="stand">S</td>
            </tr>
            <tr><th scope="row" rowspan="8" style="writing-mode: vertical-rl; text-orientation: mixed;">Soft Totals</th>
                <th scope="row">A,2</th>
                <td class="hit">H</td><td class="hit">H</td><td class="hit">H</td><td class="double-hit">D/H</td><td class="double-hit">D/H</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td>
            </tr>
             <tr>
                <th scope="row">A,3</th>
                <td class="hit">H</td><td class="hit">H</td><td class="hit">H</td><td class="double-hit">D/H</td><td class="double-hit">D/H</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td>
            </tr>
            <tr>
                <th scope="row">A,4</th>
                <td class="hit">H</td><td class="hit">H</td><td class="double-hit">D/H</td><td class="double-hit">D/H</td><td class="double-hit">D/H</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td>
            </tr>
             <tr>
                <th scope="row">A,5</th>
                <td class="hit">H</td><td class="hit">H</td><td class="double-hit">D/H</td><td class="double-hit">D/H</td><td class="double-hit">D/H</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td>
            </tr>
            <tr>
                <th scope="row">A,6</th>
                <td class="hit">H</td><td class="double-hit">D/H</td><td class="double-hit">D/H</td><td class="double-hit">D/H</td><td class="double-hit">D/H</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td>
            </tr>
            <tr>
                <th scope="row">A,7</th>
                <td class="stand">S</td><td class="double-stand">D/S</td><td class="double-stand">D/S</td><td class="double-stand">D/S</td><td class="double-stand">D/S</td><td class="stand">S</td><td class="stand">S</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td>
            </tr>
            <tr>
                <th scope="row">A,8</th>
                <td class="stand">S</td><td class="stand">S</td><td class="stand">S</td><td class="stand">S</td><td class="double-stand">D/S</td><td class="stand">S</td><td class="stand">S</td><td class="stand">S</td><td class="stand">S</td><td class="stand">S</td>
            </tr>
            <tr>
                <th scope="row">A,9+</th>
                <td class="stand">S</td><td class="stand">S</td><td class="stand">S</td><td class="stand">S</td><td class="stand">S</td><td class="stand">S</td><td class="stand">S</td><td class="stand">S</td><td class="stand">S</td><td class="stand">S</td>
            </tr>
            <tr><th scope="row" rowspan="10" style="writing-mode: vertical-rl; text-orientation: mixed;">Pairs</th>
                <th scope="row">A,A</th>
                <td class="split">P</td><td class="split">P</td><td class="split">P</td><td class="split">P</td><td class="split">P</td><td class="split">P</td><td class="split">P</td><td class="split">P</td><td class="split">P</td><td class="split">P</td>
            </tr>
            <tr>
                <th scope="row">10,10</th>
                <td class="stand">S</td><td class="stand">S</td><td class="stand">S</td><td class="stand">S</td><td class="stand">S</td><td class="stand">S</td><td class="stand">S</td><td class="stand">S</td><td class="stand">S</td><td class="stand">S</td>
            </tr>
            <tr>
                <th scope="row">9,9</th>
                <td class="split">P</td><td class="split">P</td><td class="split">P</td><td class="split">P</td><td class="split">P</td><td class="stand">S</td><td class="split">P</td><td class="split">P</td><td class="stand">S</td><td class="stand">S</td>
            </tr>
            <tr>
                <th scope="row">8,8</th>
                <td class="split">P</td><td class="split">P</td><td class="split">P</td><td class="split">P</td><td class="split">P</td><td class="split">P</td><td class="split">P</td><td class="split">P</td><td class="split">P</td><td class="split">P</td>
            </tr>
            <tr>
                <th scope="row">7,7</th>
                <td class="split">P</td><td class="split">P</td><td class="split">P</td><td class="split">P</td><td class="split">P</td><td class="split">P</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td>
            </tr>
            <tr>
                <th scope="row">6,6</th>
                <td class="split-hit">P/H</td><td class="split">P</td><td class="split">P</td><td class="split">P</td><td class="split">P</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td>
            </tr>
            <tr>
                <th scope="row">5,5</th>
                <td class="double-hit">D/H</td><td class="double-hit">D/H</td><td class="double-hit">D/H</td><td class="double-hit">D/H</td><td class="double-hit">D/H</td><td class="double-hit">D/H</td><td class="double-hit">D/H</td><td class="double-hit">D/H</td><td class="hit">H</td><td class="hit">H</td>
            </tr>
            <tr>
                <th scope="row">4,4</th>
                <td class="hit">H</td><td class="hit">H</td><td class="hit">H</td><td class="split-hit">P/H</td><td class="split-hit">P/H</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td>
            </tr>
            <tr>
                <th scope="row">3,3</th>
                <td class="split-hit">P/H</td><td class="split-hit">P/H</td><td class="split">P</td><td class="split">P</td><td class="split">P</td><td class="split">P</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td>
            </tr>
            <tr>
                <th scope="row">2,2</th>
                <td class="split-hit">P/H</td><td class="split-hit">P/H</td><td class="split">P</td><td class="split">P</td><td class="split">P</td><td class="split">P</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td><td class="hit">H</td>
            </tr>
        </tbody>
    </table>

    <div class="legend">
        <div class="legend-item"><div class="legend-key hit"></div> <b>H</b>: Hit</div>
        <div class="legend-item"><div class="legend-key stand"></div> <b>S</b>: Stand</div>
        <div class="legend-item"><div class="legend-key split"></div> <b>P</b>: Split</div>
        <div class="legend-item"><div class="legend-key double-hit"></div> <b>D/H</b>: Double if allowed, otherwise Hit</div>
        <div class="legend-item"><div class="legend-key double-stand"></div> <b>D/S</b>: Double if allowed, otherwise Stand</div>
        <div class="legend-item"><div class="legend-key split-hit"></div> <b>P/H</b>: Split if Double after Split is allowed, otherwise Hit</div>
        <div class="legend-item"><div class="legend-key surrender-hit"></div> <b>R/H</b>: Surrender if allowed, otherwise Hit</div>
    </div>

        <!-- <div class="chart-legend">
          <p class="note-text"><strong>Legend:</strong> H = Hit, S = Stand, D = Double (hit if not allowed), P = Split</p>
        </div> -->
      </div>
    </section>

    <!-- Rules Section -->
    <section class="content-section">
      <h2 class="section-title">Section 3: Essential Basic Strategy Rules – Your Complete Playbook</h2>
      
      <div class="content-with-image">
        <div class="text-content">
          <p class="content-text">
            Here's where theory meets practice. You need to know when to hit, stand, double down, and split pairs. 
            This is honestly where most people succeed or fail when learning blackjack basic strategy, but any good blackjack coach will tell you these rules are absolutely learnable.
          </p>

          <p class="content-text">
            <strong>When to Hit:</strong> Hit when your hard total is 8 or less. Hit on hard 12 against dealer's 2, 3, 7, 8, 9, 10, or Ace. Hit on soft 17 or less (except when doubling is optimal).
          </p>

          <p class="content-text">
            <strong>When to Stand:</strong> Stand on hard 17 or higher. Stand on hard 13-16 against dealer's 2-6 (let the dealer bust). Stand on soft 19 or higher.
          </p>

          <p class="content-text">
            <strong>When to Double Down:</strong> Double down allows you to double your bet for exactly one more card. Hard 10 against dealer's 2-9. Hard 11 against dealer's 2-10. Soft hands against weak dealer upcards.
          </p>

          <p class="content-text">
            <strong>When to Split Pairs:</strong> Always split Aces and 8s. Never split 4s, 5s, or 10s. Split other pairs against weak dealer upcards (2-6).
          </p>

          <p class="content-text">
            Remember, every professional blackjack coach will tell you the same thing: dealer upcard strength is crucial. Weak upcards (2-6) mean you should be more conservative and let the dealer bust more often.
          </p>

          <p class="content-text">
            The bottom line? Master these fundamentals with our interactive trainer, and you'll have the complete foundation for successful blackjack basic strategy that actually works in real games.
          </p>
        </div>
      </div>
    </section>

    <!-- Common Mistakes Section -->
    <section class="content-section">
      <h2 class="section-title">Section 4: Common Basic Strategy Mistakes Every Blackjack Coach Warns About</h2>
      
      <div class="content-with-image">
        <div class="text-content">
          <p class="content-text">
            Even with the best blackjack trainer, players make predictable mistakes that cost them money. Here are the big ones that separate beginners from players who actually win:
          </p>

          <p class="content-text">
            <strong>Taking Insurance:</strong> Never take insurance, even with a blackjack. The math is clear – insurance is a side bet with a huge house edge that no basic strategy chart will ever recommend.
          </p>

          <p class="content-text">
            <strong>Playing Hunches:</strong> "I have a feeling" is the enemy of basic strategy. Every blackjack simulator will show you that emotions and hunches lose money over time.
          </p>

          <p class="content-text">
            <strong>Mimicking the Dealer:</strong> The dealer hits on 16 and stands on 17, but that's not optimal for players. You have information (the dealer's upcard) and options (double, split) that change the math completely.
          </p>

          <p class="content-text">
            <strong>Progressive Betting Systems:</strong> Martingale, Fibonacci, and other betting systems don't change the house edge. Basic strategy assumes consistent, smart betting – not chasing losses with bigger bets.
          </p>

          <p class="content-text">
            <strong>Ignoring Composition-Dependent Plays:</strong> While basic strategy works for 99% of situations, advanced players sometimes adjust based on the specific cards that make up their hand, not just the total.
          </p>

          <p class="content-text">
            Here's what every blackjack coach emphasizes: practice makes permanent, not perfect. If you practice mistakes, you'll play mistakes. That's why starting with a solid blackjack trainer and sticking to proven basic strategy is so important.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>


<style scoped>

.blackjack-content, .blackjack-content * {
  color: #fff !important;
}

.blackjack-content {
  max-width: 56rem;
  margin: 0 auto;
  padding: 0 1rem;
  font-family: inherit;
  line-height: 1.6;
  border: 2px solid white;
  margin-top: 40px;
  border-radius: 1.75rem;
}

.greenBG {
    background: radial-gradient(circle closest-corner at top 100% right 100%, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, .46) 98%), repeat center center url(/green_table.webp);
  font-family: sans-serif;
}

/* Typography using rems */
.main-title {
  font-size: 1.7rem;
  font-weight: bold;
  color: #1a1a1a;
  margin: 1.5rem 0;
  text-align: center;
  line-height: 1.2;
}

.section-title {
  font-size: 1.75rem;
  font-weight: bold;
  color: #2d2d2d;
  margin: 2rem 0 1rem 0;
  text-align: center;
}

.subsection-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin: 1.5rem 0 0.75rem 0;
}

.action-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.5rem 0;
}

.content-text {
  font-size: 1.3rem;
  color: #4a4a4a;
  margin: 0.75rem 0;
  text-align: center;
  margin-top: 2rem;
}

.hero-description {
  font-size: 1.3rem;
  color: #555;
  margin: 1rem 0 2rem 0;
  text-align: left;
}

.example-text {
  font-size: 1.2rem;
  color: #666;
  font-style: italic;
  margin: 0.5rem 0;
  text-align: center;
}

.note-text {
  font-size: 1.2rem;
  color: #666;
  margin: 0.5rem 0;
  text-align: center;
}

/* Layout */
.content-section {
  margin: 3rem 0;
}

.subsection {
  margin: 2rem 0;
}

.content-with-image {
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.text-content {
  flex: 1;
  text-align: center;
}

.image-container {
  width: 100%;
  max-width: 24rem;
}

/* Images */
.hero-img,
.content-img {
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.hero-img {
  max-height: 16rem;
  object-fit: cover;
  margin: 0 0 1.5rem 0;
}

.content-img {
  max-height: 12rem;
  object-fit: cover;
}


/* Special boxes */
.highlight-box {
  /* background: #f8f9fa; */
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin: 1.5rem 0;
  border-left: 4px solid #007acc;
}

.conclusion-box {
  background: linear-gradient(135deg, #f1f8ff 0%, #e8f4f8 100%);
  padding: 2rem;
  border-radius: 0.5rem;
  margin: 2rem 0;
}

/* Responsive design */
@media (min-width: 768px) {
  .content-with-image {
    flex-direction: row;
    text-align: left;
  }
  
  .text-content {
    text-align: left;
  }
  
  .content-text,
  .example-text,
  .note-text {
    text-align: left;
  }
  

}

@media (min-width: 1024px) {
  .blackjack-content {
    padding: 0 2rem;
  }
}



/* --------------------------------------------------------- */
.greenBG {
  background: radial-gradient(circle closest-corner at top 100% right 100%, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, .46) 98%), repeat center center url(/green_table.webp);
  font-family: sans-serif;
}

.content {
  padding: 0 2rem;
  max-width: 48rem;
  margin: 0 auto;
  line-height: 1.6;
  border: 2px solid white;
  margin-top: 40px;
  border-radius: 1.75rem;
}

/* Strategy Table Styles */
.strategy-chart {
  margin: 2rem 0;
}

.chart-section {
  margin: 2rem 0;
}

.strategy-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  font-size: 0.9rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 0.5rem;
  overflow: hidden;
}

.strategy-table th,
.strategy-table td {
  padding: 0.5rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff !important;
}

.strategy-table th {
  background: rgba(255, 255, 255, 0.1);
  font-weight: bold;
  font-size: 0.8rem;
}

.strategy-table td:first-child {
  background: rgba(255, 255, 255, 0.05);
  font-weight: bold;
}

.strategy-table td {
  font-weight: bold;
}

/* Color coding for actions */
.strategy-table td:not(:first-child) {
  font-size: 0.8rem;
}

.chart-legend {
  margin: 1rem 0;
  text-align: center;
}

.section-divider td {
  background: rgba(255, 255, 255, 0.2) !important;
  font-weight: bold !important;
  text-align: center !important;
  color: #fff !important;
}

/* New Basic Strategy Table Styles */
.strategy-chart table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  font-size: 0.9rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 0.5rem;
  overflow: hidden;
}

.strategy-chart table th,
.strategy-chart table td {
  padding: 0.5rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff !important;
  font-weight: bold;
}

.strategy-chart table th {
  background: rgba(255, 255, 255, 0.1);
  font-weight: bold;
  font-size: 1rem;
}

/* Color-coded strategy cells */
.hit {
  background-color: #ff6b6b !important; /* Red for Hit */
  color: white !important;
}

.stand {
  background-color: #51cf66 !important; /* Green for Stand */
  color: white !important;
}

.split {
  background-color: #339af0 !important; /* Blue for Split */
  color: white !important;
}

.double-hit {
  background-color: #ffd43b !important; /* Yellow for Double/Hit */
  color: black !important;
}

.double-stand {
  background-color: #94d82d !important; /* Light Green for Double/Stand */
  color: black !important;
}

.split-hit {
  background-color: #74c0fc !important; /* Light Blue for Split/Hit */
  color: black !important;
}

.surrender-hit {
  background-color: #ff8cc8 !important; /* Pink for Surrender/Hit */
  color: black !important;
}

/* Legend Styles */
.legend {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1rem 0;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff !important;
  font-size: 0.9rem;
}

.legend-key {
  width: 20px;
  height: 20px;
  border-radius: 3px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

/* Vertical text for row headers */
.strategy-chart table th[rowspan] {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  background: rgba(255, 255, 255, 0.15) !important;
  font-weight: bold;
  padding: 1rem 0.5rem;
}

@media (max-width: 768px) {
  .strategy-table {
    font-size: 0.7rem;
  }
  
  .strategy-table th,
  .strategy-table td {
    padding: 0.3rem;
  }
  
  .strategy-table td:not(:first-child) {
    font-size: 0.7rem;
  }
}

</style>