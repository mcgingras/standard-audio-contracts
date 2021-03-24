import React from 'react';
import Nav from '../components/Nav';
import CassetteGrid from '../components/CassetteGrid';

const cassetteDemoData = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8
]

const Homepage = () => {
  return (
    <div>
      <section className="bg-purple-800">
        <div className="container mx-auto pt-10">
        <Nav />
        <div className="py-40">
          <h1 className="text-white text-4xl w-3/5" style={{"line-height": "3rem"}}>NFTapes are bringing cassettes to the digital age.</h1>
          <h3 className="text-white text-xl w-2/5 mt-4">Create a digital mixtape that is unique and rewriteable with songs served from Spotify.</h3>
        </div>
        </div>
      </section>

      <section className="container mx-auto mt-20 mb-40">
        <CassetteGrid cassettes={cassetteDemoData} />
      </section>

      <section className="container mx-auto mb-20">
        <div className="w-3/5">
          <h2 className="text-3xl mb-12">
            So why are these NFTs? Aren’t those just useless and destroying the earth?
          </h2>
          <p className="mb-8 text-lg">So far, popular uses of NFTs have been to play games with, or to create digital provenance for files like gifs, jpegs, or videos. We think that NFTs can power things that are more creative.</p>
          <p className="mb-8 text-lg">Unlike other services, we use a multi-signature system to mint our NFTs: so our tapes don’t exist on the chain until you claim or buy them. This way, there aren’t hundreds of thousands of abandoned objects being minted onto the chain.</p>

          <h3 className="mb-6 text-lg font-bold">What happens to my NFT if you shut down?</h3>
          <p className="mb-8 text-lg">Our structure is hosted entirely using IPFS, with backup servers secured to only host the contents of our tapes that have been minted. So even if our website goes down, the tapes and their contents will still be live.</p>

          <h3 className="mb-6 text-lg font-bold">Do these tapes host copyrighted content?</h3>
          <p className="mb-8 text-lg">NFTapes are 3D representations of casette tapes that hold spotify playlists, so we don’t host any copyrighted content.</p>

          <h3 className="mb-6 text-lg font-bold">I’m an artist, what do I get out of this platform?</h3>
          <p className="mb-8 text-lg">If you are an artist whose songs are on a casette’s playlist, our hope is that the casette will drive more listeners to your content on Spotify and showcase that your fans have immortalized links to your content where you have posted it.</p>

          <h3 className="mb-6 text-lg font-bold">How do you moderate what content is on the platform? I’m an artist that doesn’t want my content on this platform.</h3>
          <p className="mb-8 text-lg">We can’t control what someone might upload to a tape, but we can black-list the tape from being listened to in the listening room. If you do not want your content to be featured on our platform please contact us and we will remove any tape from the listening room containing your content as soon as possible.</p>
          <p className="text-lg">The same goes for direct hate speech. Any direct hate-speech content will be moderated from the listening room.</p>
        </div>
      </section>
    </div>
  )
}

export default Homepage;